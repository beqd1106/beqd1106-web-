#!/usr/bin/env python3
"""
官公庁サイト更新監視スクリプト
GitHub Actionsから週次実行 → 変更があれば news.js を更新してコミット
"""
import hashlib
import json
import os
import re
import sys
from datetime import datetime, timezone, timedelta
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# ─── 定数 ───────────────────────────────────────────
JST = timezone(timedelta(hours=9))
SCRIPT_DIR  = Path(__file__).parent
STATE_FILE  = SCRIPT_DIR / "monitor_state.json"
NEWS_JS     = SCRIPT_DIR.parent / "news.js"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; FukushiGuideMonitor/1.0; "
        "+https://fukushi-guide-kyoto.netlify.app)"
    ),
    "Accept-Language": "ja,en;q=0.9",
}

# ─── 監視対象 ─────────────────────────────────────────
TARGETS = [
    {
        "id": "mhlw_shougai_service",
        "name": "厚生労働省 障害福祉サービス等報酬算定",
        "url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/index.html",
        "selector": "#contentsArea",
        "labels": ["就労A型", "就労B型", "相談支援", "請求・加算"],
        "href": "05_請求業務.html",
    },
    {
        "id": "mhlw_houmon_kango",
        "name": "厚生労働省 訪問看護療養費",
        "url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000188135.html",
        "selector": "#contentsArea",
        "labels": ["訪問看護", "請求・加算"],
        "href": "05_請求業務.html",
    },
    {
        "id": "mhlw_shinryo_kaitei",
        "name": "厚生労働省 診療報酬改定",
        "url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000106421.html",
        "selector": "#contentsArea",
        "labels": ["訪問看護", "請求・加算", "監査・法令"],
        "href": "05_請求業務.html",
    },
    {
        "id": "kyoto_shougai",
        "name": "京都府 障害者支援課",
        "url": "https://www.pref.kyoto.jp/shogai-so/",
        "selector": "main, #main, .contents, body",
        "labels": ["京都府", "書類"],
        "href": "04_京都府・手続き.html",
    },
    {
        "id": "mhlw_shougai_law",
        "name": "厚生労働省 障害者総合支援法",
        "url": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/index.html",
        "selector": "#contentsArea",
        "labels": ["監査・法令", "全体"],
        "href": "01_法令・制度.html",
    },
]

# ─── ヘルパー ─────────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    return {}


def save_state(state: dict) -> None:
    STATE_FILE.write_text(
        json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def page_hash(url: str, selector: str) -> tuple[str, str]:
    """ページの指定セレクタ部分をハッシュ化。(hash, text_snippet) を返す"""
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()

    # エンコーディング推定（Shift_JIS → UTF-8）
    if resp.encoding and resp.encoding.lower() in ("shift_jis", "shift-jis", "sjis"):
        text = resp.content.decode("shift_jis", errors="replace")
    else:
        text = resp.text

    soup = BeautifulSoup(text, "lxml")

    # 不安定な要素を除去
    for tag in soup.select("script, style, header, footer, nav, .breadcrumb, #header, #footer, #gnav"):
        tag.decompose()

    # セレクタで絞り込み（複数指定はカンマ区切りで fallback）
    target_el = None
    for sel in selector.split(","):
        target_el = soup.select_one(sel.strip())
        if target_el:
            break
    if not target_el:
        target_el = soup.body or soup

    content = target_el.get_text(separator="\n", strip=True)
    digest = hashlib.sha256(content.encode()).hexdigest()
    snippet = content[:200].replace("\n", " ")
    return digest, snippet


def update_news_js(new_entries: list[dict]) -> None:
    """news.js の GUIDE_NEWS 配列の先頭に新エントリを挿入する"""
    if not NEWS_JS.exists():
        print(f"[WARN] {NEWS_JS} が見つかりません。スキップします。")
        return

    js_text = NEWS_JS.read_text(encoding="utf-8")

    # 既存エントリをパース（単純な文字列操作で配列の先頭に追加）
    insert_marker = "var GUIDE_NEWS = [\n"
    idx = js_text.find(insert_marker)
    if idx == -1:
        print("[WARN] GUIDE_NEWS の挿入位置が見つかりません。")
        return

    insert_pos = idx + len(insert_marker)

    # 新エントリのJS文字列を生成
    def make_entry(e: dict) -> str:
        labels_js = json.dumps(e["labels"], ensure_ascii=False)
        return (
            f'  {{\n'
            f'    date: "{e["date"]}",\n'
            f'    title: "{e["title"]}",\n'
            f'    labels: {labels_js},\n'
            f'    href: "{e["href"]}"\n'
            f'  }},\n'
        )

    new_block = "".join(make_entry(e) for e in reversed(new_entries))
    updated = js_text[:insert_pos] + new_block + js_text[insert_pos:]
    NEWS_JS.write_text(updated, encoding="utf-8")
    print(f"[OK] news.js に {len(new_entries)} 件追加しました。")


# ─── メイン ──────────────────────────────────────────

def main() -> None:
    state = load_state()
    today = datetime.now(JST).strftime("%Y-%m-%d")
    new_entries: list[dict] = []
    changed = False

    for target in TARGETS:
        tid = target["id"]
        print(f"\n[CHECK] {target['name']}")
        print(f"        {target['url']}")

        try:
            digest, snippet = page_hash(target["url"], target["selector"])
        except Exception as exc:
            print(f"[ERR]  取得失敗: {exc}")
            continue

        prev = state.get(tid, {})
        prev_digest = prev.get("hash", "")

        if digest == prev_digest:
            print(f"[--]   変更なし (hash: {digest[:12]}...)")
        else:
            if prev_digest:  # 初回登録でなければ更新扱い
                print(f"[NEW]  更新を検知！ {prev_digest[:12]} → {digest[:12]}")
                title = f"【更新検知】{target['name']} のページに変更がありました"
                new_entries.append({
                    "date":   today,
                    "title":  title,
                    "labels": target["labels"],
                    "href":   target["href"],
                })
                changed = True
            else:
                print(f"[INIT] 初回ハッシュを記録: {digest[:12]}...")

        state[tid] = {
            "hash":     digest,
            "snippet":  snippet,
            "checked":  today,
        }

    save_state(state)

    if new_entries:
        update_news_js(new_entries)
        print(f"\n✅ {len(new_entries)} 件の更新を news.js に追記しました。")
    else:
        print("\n✅ 全サイト変更なし。news.js は更新不要です。")

    # GitHub Actions に変更有無を伝える（出力変数）
    gha_output = os.environ.get("GITHUB_OUTPUT", "")
    if gha_output:
        with open(gha_output, "a", encoding="utf-8") as f:
            f.write(f"changed={'true' if changed else 'false'}\n")


if __name__ == "__main__":
    main()

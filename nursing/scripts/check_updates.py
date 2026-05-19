#!/usr/bin/env python3
"""
官公庁サイト更新監視スクリプト（拡張版）
GitHub Actionsから毎日実行
  1. 法令・制度ページの変更を検知 → news.js に追記
  2. 公式様式ページの最新DLリンクを取得 → HTMLのhrefを自動更新
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

# ─── 定数 ───────────────────────────────────────────────
JST        = timezone(timedelta(hours=9))
SCRIPT_DIR = Path(__file__).parent
NURSING    = SCRIPT_DIR.parent          # nursing/ ルート
STATE_FILE = SCRIPT_DIR / "monitor_state.json"
NEWS_JS    = NURSING / "news.js"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (compatible; FukushiGuideMonitor/1.0; "
        "+https://beqd1106.com/nursing/)"
    ),
    "Accept-Language": "ja,en;q=0.9",
}

# ─── 【1】法令・制度ページ監視対象 ───────────────────────
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
        "name": "厚生労働省 訪問看護療養費（診療報酬改定）",
        "url": "https://www.mhlw.go.jp/stf/newpage_38790.html",
        "selector": "#contentsArea, main, body",
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
        "name": "京都府 障害福祉サービス事業者情報",
        "url": "https://www.pref.kyoto.jp/shogaishien/syogaifukushi.html",
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
    # 様式ページも法令監視対象として追加（変更通知のため）
    {
        "id": "kyoto_shoguu_page",
        "name": "京都府 処遇改善加算届出ページ",
        "url": "https://www.pref.kyoto.jp/shogaishien/syougaifukusisa-bisutouhousyuukaiteitodoke.html",
        "selector": "main, .contents, body",
        "labels": ["書類", "請求・加算", "京都府"],
        "href": "04_京都府・手続き.html",
    },
    {
        "id": "kyoto_shitei_page",
        "name": "京都府 指定申請様式ページ",
        "url": "https://www.pref.kyoto.jp/shogaishien/2016syougaijigyousyositei.html",
        "selector": "main, .contents, body",
        "labels": ["書類", "京都府"],
        "href": "02_必要書類.html",
    },
]

# ─── 【2】公式様式 DLリンク監視・自動更新の定義 ───────────
#
# file_patterns: ページ上の <a href=".xlsx"> リンクを絞り込む条件
#   link_keywords : リンクテキストまたはURLに含まれる語（AND検索）
#   file_exts     : 対象拡張子
#   prefer_first  : True = ページ上で最初にマッチしたURLを「最新」とみなす
#   html_files    : 更新対象のHTMLファイル（nursing/からの相対パス）
#
FORM_SOURCES = [
    # ── 処遇改善加算 計画書（別紙様式2）─────────────────────
    {
        "id":   "form_shoguu_keikaku",
        "name": "処遇改善計画書（別紙様式2）",
        "page_url": "https://www.pref.kyoto.jp/shogaishien/syougaifukusisa-bisutouhousyuukaiteitodoke.html",
        "base_url": "https://www.pref.kyoto.jp",
        "selector": "main, .contents, body",
        "link_keywords": ["keikaku"],   # URL中のキーワード
        "link_text_kw": ["計画書", "別紙様式2"],
        "file_exts": [".xlsx", ".xls"],
        "prefer_first": True,
        "html_files": [
            "02_必要書類.html",
            "04_京都府・手続き.html",
            "05_請求業務.html",
            "06_就労継続A型.html",
            "07_就労継続B型.html",
            "フォーマット/index.html",
        ],
        "labels": ["書類", "請求・加算", "京都府"],
    },
    # ── 処遇改善加算 実績報告書（別紙様式3）──────────────────
    {
        "id":   "form_shoguu_jisseki",
        "name": "処遇改善実績報告書（別紙様式3）",
        "page_url": "https://www.pref.kyoto.jp/shogaishien/syougaifukusisa-bisutouhousyuukaiteitodoke.html",
        "base_url": "https://www.pref.kyoto.jp",
        "selector": "main, .contents, body",
        "link_keywords": ["jisseki"],
        "link_text_kw": ["実績報告書", "別紙様式3"],
        "file_exts": [".xlsx", ".xls"],
        "prefer_first": True,
        "html_files": [
            "05_請求業務.html",
            "フォーマット/index.html",
        ],
        "labels": ["書類", "請求・加算", "京都府"],
    },
    # ── 変更届出書（別紙様式4）────────────────────────────────
    {
        "id":   "form_shoguu_henko",
        "name": "処遇改善変更届出書（別紙様式4）",
        "page_url": "https://www.pref.kyoto.jp/shogaishien/syougaifukusisa-bisutouhousyuukaiteitodoke.html",
        "base_url": "https://www.pref.kyoto.jp",
        "selector": "main, .contents, body",
        "link_keywords": ["henkotodoke"],
        "link_text_kw": ["変更届出書", "別紙様式4"],
        "file_exts": [".xlsx", ".xls"],
        "prefer_first": True,
        "html_files": [],   # 現状HTMLから直接リンクしていないため更新対象なし
        "labels": ["書類", "京都府"],
    },
    # ── 指定申請 事前相談票 ──────────────────────────────────
    {
        "id":   "form_jizen_soudan",
        "name": "事前相談票（京都府）",
        "page_url": "https://www.pref.kyoto.jp/shogaishien/2016syougaijigyousyositei.html",
        "base_url": "https://www.pref.kyoto.jp",
        "selector": "main, .contents, body",
        "link_keywords": ["jizensoudan"],
        "link_text_kw": ["事前相談票"],
        "file_exts": [".xls", ".xlsx"],
        "prefer_first": True,
        "html_files": [
            "02_必要書類.html",
            "04_京都府・手続き.html",
            "フォーマット/index.html",
        ],
        "labels": ["書類", "京都府"],
    },
    # ── 指定申請 申請法人概要 ────────────────────────────────
    {
        "id":   "form_houjin_gaiyou",
        "name": "申請法人概要（京都府）",
        "page_url": "https://www.pref.kyoto.jp/shogaishien/2016syougaijigyousyositei.html",
        "base_url": "https://www.pref.kyoto.jp",
        "selector": "main, .contents, body",
        "link_keywords": ["houjingaiyou"],
        "link_text_kw": ["申請法人", "法人概要"],
        "file_exts": [".xls", ".xlsx"],
        "prefer_first": True,
        "html_files": [
            "02_必要書類.html",
            "04_京都府・手続き.html",
            "フォーマット/index.html",
        ],
        "labels": ["書類", "京都府"],
    },
    # ── 指定申請 従業者一覧 ──────────────────────────────────
    {
        "id":   "form_juugyousha",
        "name": "従業者一覧（京都府）",
        "page_url": "https://www.pref.kyoto.jp/shogaishien/2016syougaijigyousyositei.html",
        "base_url": "https://www.pref.kyoto.jp",
        "selector": "main, .contents, body",
        "link_keywords": ["jyuugyousya"],
        "link_text_kw": ["従業者", "勤務体制"],
        "file_exts": [".xls", ".xlsx"],
        "prefer_first": True,
        "html_files": [
            "02_必要書類.html",
            "04_京都府・手続き.html",
            "フォーマット/index.html",
        ],
        "labels": ["書類", "京都府"],
    },
    # ── 指定申請 資金計画 ────────────────────────────────────
    {
        "id":   "form_shikin",
        "name": "資金計画（京都府）",
        "page_url": "https://www.pref.kyoto.jp/shogaishien/2016syougaijigyousyositei.html",
        "base_url": "https://www.pref.kyoto.jp",
        "selector": "main, .contents, body",
        "link_keywords": ["sikinkeikaku"],
        "link_text_kw": ["資金計画"],
        "file_exts": [".xls", ".xlsx"],
        "prefer_first": True,
        "html_files": [
            "02_必要書類.html",
            "フォーマット/index.html",
        ],
        "labels": ["書類", "京都府"],
    },
]

# ─── ヘルパー: ページ取得 ────────────────────────────────
def fetch_soup(url: str) -> BeautifulSoup:
    resp = requests.get(url, headers=HEADERS, timeout=30)
    resp.raise_for_status()
    enc = resp.encoding or "utf-8"
    if enc.lower() in ("shift_jis", "shift-jis", "sjis"):
        text = resp.content.decode("shift_jis", errors="replace")
    else:
        text = resp.text
    return BeautifulSoup(text, "lxml")


def page_hash(url: str, selector: str) -> tuple[str, str]:
    soup = fetch_soup(url)
    for tag in soup.select("script, style, header, footer, nav, .breadcrumb"):
        tag.decompose()
    el = None
    for sel in selector.split(","):
        el = soup.select_one(sel.strip())
        if el:
            break
    if not el:
        el = soup.body or soup
    content = el.get_text(separator="\n", strip=True)
    digest = hashlib.sha256(content.encode()).hexdigest()
    snippet = content[:200].replace("\n", " ")
    return digest, snippet


# ─── ヘルパー: 様式リンク取得 ────────────────────────────
def find_form_url(soup: BeautifulSoup, base_url: str,
                  link_keywords: list[str], link_text_kw: list[str],
                  file_exts: list[str], prefer_first: bool) -> str | None:
    """
    ページから条件に合う最初の様式ファイルのURLを返す。
    link_keywords : URL中に含まれるべきキーワード（AND）
    link_text_kw  : リンクテキストに含まれるべきキーワード（OR）
    """
    candidates = []
    for a in soup.find_all("a", href=True):
        href: str = a["href"]
        # 拡張子チェック
        if not any(href.lower().endswith(ext) for ext in file_exts):
            continue
        # URLキーワードチェック（AND）
        if not all(kw.lower() in href.lower() for kw in link_keywords):
            continue
        # フルURL化
        if href.startswith("http"):
            full_url = href
        elif href.startswith("/"):
            full_url = base_url.rstrip("/") + href
        else:
            full_url = base_url.rstrip("/") + "/" + href

        candidates.append((full_url, a.get_text(strip=True)))

    if not candidates:
        # link_keywordsで見つからない場合はテキストキーワードで再検索
        for a in soup.find_all("a", href=True):
            href: str = a["href"]
            if not any(href.lower().endswith(ext) for ext in file_exts):
                continue
            text = a.get_text(strip=True)
            if any(kw in text for kw in link_text_kw):
                if href.startswith("http"):
                    full_url = href
                elif href.startswith("/"):
                    full_url = base_url.rstrip("/") + href
                else:
                    full_url = base_url.rstrip("/") + "/" + href
                candidates.append((full_url, text))

    if not candidates:
        return None
    return candidates[0][0] if prefer_first else candidates[-1][0]


# ─── ヘルパー: HTMLファイルのURL置換 ────────────────────
def update_html_url(html_path: Path, old_url: str, new_url: str) -> bool:
    """old_url を new_url に置換。変更があれば True を返す。"""
    if not html_path.exists():
        return False
    text = html_path.read_text(encoding="utf-8")
    if old_url not in text:
        return False
    updated = text.replace(old_url, new_url)
    html_path.write_text(updated, encoding="utf-8")
    return True


# ─── ヘルパー: news.js 更新 ──────────────────────────────
def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    return {}


def save_state(state: dict) -> None:
    STATE_FILE.write_text(
        json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def update_news_js(new_entries: list[dict]) -> None:
    if not NEWS_JS.exists():
        print(f"[WARN] {NEWS_JS} が見つかりません。スキップ。")
        return
    js_text = NEWS_JS.read_text(encoding="utf-8")
    marker = "var GUIDE_NEWS = [\n"
    idx = js_text.find(marker)
    if idx == -1:
        print("[WARN] GUIDE_NEWS の挿入位置が見つかりません。")
        return
    insert_pos = idx + len(marker)

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

    block = "".join(make_entry(e) for e in reversed(new_entries))
    updated = js_text[:insert_pos] + block + js_text[insert_pos:]
    NEWS_JS.write_text(updated, encoding="utf-8")
    print(f"[OK] news.js に {len(new_entries)} 件追加")


# ─── メイン ──────────────────────────────────────────────
def main() -> None:
    state    = load_state()
    today    = datetime.now(JST).strftime("%Y-%m-%d")
    new_entries: list[dict] = []
    changed  = False

    # ── フェーズ1: 法令ページのハッシュ監視 ──────────────
    print("\n═══ フェーズ1: 法令・制度ページ監視 ═══")
    # ページキャッシュ（同じURLを複数TARGETが参照する場合に再取得を防ぐ）
    page_cache: dict[str, BeautifulSoup] = {}

    for target in TARGETS:
        tid = target["id"]
        print(f"\n[CHECK] {target['name']}")
        try:
            digest, snippet = page_hash(target["url"], target["selector"])
        except Exception as exc:
            print(f"[ERR]  取得失敗: {exc}")
            continue

        prev_digest = state.get(tid, {}).get("hash", "")
        if digest == prev_digest:
            print(f"[--]   変更なし")
        else:
            if prev_digest:
                print(f"[NEW]  更新検知！")
                new_entries.append({
                    "date":   today,
                    "title":  f"【更新検知】{target['name']} のページに変更があります",
                    "labels": target["labels"],
                    "href":   target["href"],
                })
                changed = True
            else:
                print(f"[INIT] 初回ハッシュ記録: {digest[:12]}...")

        state[tid] = {"hash": digest, "snippet": snippet, "checked": today}

    # ── フェーズ2: 公式様式DLリンクの監視・自動更新 ──────
    print("\n═══ フェーズ2: 公式様式リンク監視 ═══")
    # 同じページURLは1回だけ取得してキャッシュ
    soup_cache: dict[str, BeautifulSoup] = {}

    for fs in FORM_SOURCES:
        fid  = fs["id"]
        purl = fs["page_url"]
        print(f"\n[FORM] {fs['name']}")

        # ページ取得（キャッシュ利用）
        if purl not in soup_cache:
            try:
                soup_cache[purl] = fetch_soup(purl)
            except Exception as exc:
                print(f"[ERR]  ページ取得失敗: {exc}")
                continue
        soup = soup_cache[purl]

        # 最新様式URLを取得
        new_url = find_form_url(
            soup, fs["base_url"],
            fs["link_keywords"], fs["link_text_kw"],
            fs["file_exts"], fs["prefer_first"],
        )

        if not new_url:
            print(f"[WARN] リンクが見つかりませんでした。スキップ。")
            continue

        print(f"[URL]  {new_url}")

        # 以前のURLと比較
        old_url = state.get(fid, {}).get("url", "")

        if old_url == new_url:
            print(f"[--]   変更なし")
        elif not old_url:
            # 初回登録
            print(f"[INIT] 初回URL記録")
        else:
            # URLが変わった = 新年度の様式が公開された
            print(f"[NEW]  様式URL更新！")
            print(f"       旧: {old_url}")
            print(f"       新: {new_url}")

            # 対象HTMLファイルを自動更新
            html_updated = []
            for rel_path in fs["html_files"]:
                html_path = NURSING / rel_path
                if update_html_url(html_path, old_url, new_url):
                    html_updated.append(rel_path)
                    print(f"       ✅ {rel_path} を更新")
                else:
                    print(f"       -- {rel_path} (旧URLなし、スキップ)")

            if html_updated:
                new_entries.append({
                    "date":   today,
                    "title":  f"【様式更新】{fs['name']} の最新版が公開されました。ダウンロードリンクを自動更新しました。",
                    "labels": fs["labels"],
                    "href":   html_updated[0],  # 最初の更新ファイルにリンク
                })
                changed = True

        # 状態を保存
        state[fid] = {"url": new_url, "checked": today}

    # ── 結果保存 ──────────────────────────────────────────
    save_state(state)

    if new_entries:
        update_news_js(new_entries)
        print(f"\n✅ {len(new_entries)} 件の更新を news.js に追記しました。")
    else:
        print("\n✅ 全サイト・全様式の変更なし。")

    # GitHub Actions 出力変数
    gha_output = os.environ.get("GITHUB_OUTPUT", "")
    if gha_output:
        with open(gha_output, "a", encoding="utf-8") as f:
            f.write(f"changed={'true' if changed else 'false'}\n")


if __name__ == "__main__":
    main()

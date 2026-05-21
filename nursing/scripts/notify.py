"""
締切・期限通知スクリプト
GitHub Actions から毎朝実行。以下の内容をメール送信：
- 今後10日以内の締切アラート
- スタッフ資格の有効期限（Sheetsが設定されている場合）
"""

import os, json, smtplib, datetime, requests
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# ── 環境変数 ─────────────────────────────────────────────────
NOTIFY_EMAIL       = os.environ.get("NOTIFY_EMAIL", "")
GMAIL_FROM         = os.environ.get("GMAIL_FROM", "")
GMAIL_APP_PASSWORD = os.environ.get("GMAIL_APP_PASSWORD", "")
RENDER_API_URL     = os.environ.get("RENDER_API_URL", "https://beqd1106-fukushi-api.onrender.com")
SPREADSHEET_ID     = os.environ.get("SPREADSHEET_ID", "")

TODAY = datetime.date.today()

def days_until(date_str: str) -> int | None:
    """YYYY-MM-DD 形式の日付まで何日か返す"""
    try:
        d = datetime.date.fromisoformat(date_str)
        return (d - TODAY).days
    except Exception:
        return None

# ── 年間締切定義（deadlines.js と同期）──────────────────────
ANNUAL_DEADLINES = [
    {"month": 4,  "day": 5,  "label": "就労移行・目標工賃加算 体制届", "level": "warning"},
    {"month": 4,  "day": 5,  "label": "工賃向上計画 提出（B型）",      "level": "warning"},
    {"month": 4,  "day": 15, "label": "処遇改善加算 計画書 提出期限",   "level": "danger"},
    {"month": 7,  "day": 31, "label": "処遇改善加算 実績報告書 提出期限","level": "danger"},
    {"month": 10, "day": 1,  "label": "最低賃金改定確認（A型）",        "level": "warning"},
    {"month": 12, "day": 28, "label": "年末年始の訪問体制確認",          "level": "info"},
    {"month": 3,  "day": 31, "label": "年度末 個別支援計画・指定更新確認","level": "info"},
]

MONTHLY_DEADLINES = [
    {"day": 10, "label": "国保連・支払基金 レセプト提出期限", "level": "danger"},
]

ALERT_DAYS = 10  # 何日以内の締切を通知するか

def get_upcoming_deadlines():
    results = []
    year = TODAY.year

    for d in ANNUAL_DEADLINES:
        for offset in [0, 1]:
            dt = datetime.date(year + offset, d["month"], d["day"])
            diff = (dt - TODAY).days
            if 0 <= diff <= ALERT_DAYS:
                results.append({
                    "label": d["label"],
                    "date":  dt.strftime("%m/%d"),
                    "diff":  diff,
                    "level": d["level"],
                })

    for d in MONTHLY_DEADLINES:
        m = TODAY.month
        for mo, ye in [(m, year), (m+1 if m<12 else 1, year if m<12 else year+1)]:
            try:
                dt = datetime.date(ye, mo, d["day"])
            except ValueError:
                continue
            diff = (dt - TODAY).days
            if 0 <= diff <= ALERT_DAYS:
                results.append({
                    "label": d["label"],
                    "date":  dt.strftime("%m/%d"),
                    "diff":  diff,
                    "level": d["level"],
                })

    results.sort(key=lambda x: x["diff"])
    return results

def get_staff_alerts():
    """Render API 経由で Google Sheets からスタッフ資格期限を取得"""
    if not SPREADSHEET_ID or RENDER_API_URL == "":
        return []
    try:
        res = requests.post(
            f"{RENDER_API_URL}/sheets/read",
            json={"spreadsheet_id": SPREADSHEET_ID, "tab": "スタッフ管理"},
            timeout=30,
        )
        if not res.ok:
            return []
        data = res.json().get("data", [])
        alerts = []
        for row in data:
            for field in ["資格有効期限", "サビ管更新期限"]:
                date_val = row.get(field, "")
                if not date_val:
                    continue
                diff = days_until(date_val)
                if diff is not None and diff <= 30:
                    alerts.append({
                        "name":  row.get("ID", "?"),
                        "role":  row.get("職種", ""),
                        "field": field,
                        "date":  date_val,
                        "diff":  diff,
                    })
        return alerts
    except Exception as e:
        print(f"スタッフ情報取得失敗: {e}")
        return []

def build_email_body(deadlines, staff_alerts):
    """メール本文（テキスト）を生成"""
    lines = [
        f"障碍者福祉事業所 運営ガイド — 毎朝の締切アラート",
        f"送信日: {TODAY.strftime('%Y年%m月%d日')}",
        "=" * 50,
        "",
    ]

    if deadlines:
        lines.append("【📅 今後10日以内の締切】")
        for d in deadlines:
            icon = {"danger": "🔴", "warning": "🟡", "info": "🔵"}.get(d["level"], "⚪")
            suffix = "今日！" if d["diff"] == 0 else "明日！" if d["diff"] == 1 else f"{d['diff']}日後"
            lines.append(f"  {icon} {d['date']} ({suffix}) {d['label']}")
        lines.append("")
    else:
        lines.append("✅ 今後10日以内に迫った締切はありません。")
        lines.append("")

    if staff_alerts:
        lines.append("【👤 スタッフ資格 期限アラート】")
        for a in staff_alerts:
            suffix = "期限切れ！" if a["diff"] <= 0 else f"{a['diff']}日後"
            lines.append(f"  ⚠️  {a['name']} ({a['role']}) — {a['field']} {a['date']} ({suffix})")
        lines.append("")

    lines += [
        "-" * 50,
        f"詳細: https://beqd1106.com/nursing/11_年間スケジュール.html",
        f"チェックリスト: https://beqd1106.com/nursing/16_実地指導チェックリスト.html",
    ]
    return "\n".join(lines)

def build_html_body(deadlines, staff_alerts):
    """メール本文（HTML）を生成"""
    level_color = {"danger": "#E53935", "warning": "#F57F17", "info": "#1565C0"}
    level_icon  = {"danger": "🔴", "warning": "🟡", "info": "🔵"}

    rows = ""
    if deadlines:
        for d in deadlines:
            color = level_color.get(d["level"], "#888")
            icon  = level_icon.get(d["level"], "⚪")
            suffix = "今日！" if d["diff"] == 0 else "明日！" if d["diff"] == 1 else f"{d['diff']}日後"
            rows += f"""<tr>
              <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;font-size:13px;">{icon} {d['date']}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;font-size:13px;font-weight:bold;color:{color};">{suffix}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;font-size:13px;">{d['label']}</td>
            </tr>"""
    else:
        rows = '<tr><td colspan="3" style="padding:16px;text-align:center;color:#7DC49A;font-weight:bold;">✅ 今後10日以内の締切はありません</td></tr>'

    staff_rows = ""
    if staff_alerts:
        for a in staff_alerts:
            suffix = "期限切れ！" if a["diff"] <= 0 else f"{a['diff']}日後"
            color  = "#E53935" if a["diff"] <= 0 else "#F57F17"
            staff_rows += f"""<tr>
              <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;font-size:13px;">{a['name']}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;font-size:13px;">{a['role']}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;font-size:13px;">{a['field']}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #f0e8e0;font-size:13px;font-weight:bold;color:{color};">{a['date']} ({suffix})</td>
            </tr>"""

    html = f"""<!DOCTYPE html><html lang="ja"><body style="margin:0;padding:0;background:#FFF8F4;font-family:Meiryo,sans-serif;">
<div style="max-width:600px;margin:20px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(200,110,70,0.12);">
  <div style="background:#D4784C;padding:20px 24px;">
    <h1 style="color:#fff;font-size:16px;margin:0;">🏥 障碍者福祉事業所 運営ガイド</h1>
    <p style="color:#fde8d8;font-size:12px;margin:4px 0 0;">毎朝の締切・期限アラート — {TODAY.strftime('%Y年%m月%d日')}</p>
  </div>
  <div style="padding:20px 24px;">
    <h2 style="font-size:14px;color:#D4784C;margin:0 0 12px;border-left:4px solid #D4784C;padding-left:10px;">📅 今後10日以内の締切</h2>
    <table style="width:100%;border-collapse:collapse;background:#FFFAF8;border-radius:8px;overflow:hidden;">
      <thead><tr style="background:#FDE8D8;">
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#D4784C;">日付</th>
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#D4784C;">残日数</th>
        <th style="padding:8px 12px;text-align:left;font-size:12px;color:#D4784C;">内容</th>
      </tr></thead>
      <tbody>{rows}</tbody>
    </table>
    {'<h2 style="font-size:14px;color:#D4784C;margin:20px 0 12px;border-left:4px solid #E53935;padding-left:10px;">⚠️ スタッフ資格 期限アラート</h2><table style="width:100%;border-collapse:collapse;background:#FFF0F0;border-radius:8px;overflow:hidden;"><thead><tr style="background:#FDE8E8;"><th style="padding:8px 12px;text-align:left;font-size:12px;">ID</th><th style="padding:8px 12px;text-align:left;font-size:12px;">職種</th><th style="padding:8px 12px;text-align:left;font-size:12px;">資格種別</th><th style="padding:8px 12px;text-align:left;font-size:12px;">期限</th></tr></thead><tbody>' + staff_rows + '</tbody></table>' if staff_alerts else ''}
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid #f0e8e0;font-size:11px;color:#aaa;">
      <a href="https://beqd1106.com/nursing/" style="color:#D4784C;">運営ガイドを開く</a> ｜
      <a href="https://beqd1106.com/nursing/16_実地指導チェックリスト.html" style="color:#D4784C;">実地指導チェックリスト</a>
    </div>
  </div>
</div>
</body></html>"""
    return html

def send_email(subject, text_body, html_body):
    """Gmail SMTP でメール送信"""
    if not all([NOTIFY_EMAIL, GMAIL_FROM, GMAIL_APP_PASSWORD]):
        print("メール設定が不完全です（NOTIFY_EMAIL / GMAIL_FROM / GMAIL_APP_PASSWORD を確認）")
        return False

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"]    = GMAIL_FROM
    msg["To"]      = NOTIFY_EMAIL

    msg.attach(MIMEText(text_body, "plain", "utf-8"))
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_FROM, GMAIL_APP_PASSWORD)
            server.sendmail(GMAIL_FROM, NOTIFY_EMAIL, msg.as_string())
        print(f"✅ メール送信成功 → {NOTIFY_EMAIL}")
        return True
    except Exception as e:
        print(f"❌ メール送信失敗: {e}")
        return False

def main():
    print(f"通知スクリプト開始: {TODAY}")

    deadlines    = get_upcoming_deadlines()
    staff_alerts = get_staff_alerts()

    total_alerts = len(deadlines) + len(staff_alerts)
    print(f"締切アラート: {len(deadlines)}件 / スタッフ期限: {len(staff_alerts)}件")

    # アラートがない日は送信しない（月曜のみサマリー送信）
    is_monday = TODAY.weekday() == 0
    if total_alerts == 0 and not is_monday:
        print("アラートなし・月曜以外 → スキップ")
        return

    subject = f"【福祉ガイド】"
    if deadlines:
        subject += f" ⏰ 締切{len(deadlines)}件"
    if staff_alerts:
        subject += f" ⚠️ 資格期限{len(staff_alerts)}件"
    if total_alerts == 0:
        subject += " ✅ 今週も締切なし（週次サマリー）"
    subject += f" — {TODAY.strftime('%m/%d')}"

    text_body = build_email_body(deadlines, staff_alerts)
    html_body = build_html_body(deadlines, staff_alerts)

    send_email(subject, text_body, html_body)

if __name__ == "__main__":
    main()

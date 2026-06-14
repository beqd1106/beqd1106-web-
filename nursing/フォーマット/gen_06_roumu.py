# -*- coding: utf-8 -*-
"""06_事故苦情ヒヤリ様式（労務・安全管理）— 実務準拠オリジナル様式 10種"""
from tpl_common import *
from tpl_common import _border, _fill, _side

F = "06_事故苦情ヒヤリ様式"

# ── 01 事故報告書 ────────────────────────────────────────────
def jiko_houkoku():
    wb, ws = new_sheet("事故報告書")
    set_widths(ws, {'A':14,'B':14,'C':14,'D':14,'E':14,'F':14,'G':12,'H':12})
    r = title_block(ws, "事故報告書", "障害福祉サービス事業所 ／ 重大事故は発生後速やかに京都府・市町村・家族へ報告", "H")
    r = blank(ws, r)
    r = section(ws, r, "1. 事故の概要")
    r = label_value_rows(ws, r, [
        ("報告日", ""), ("事業所名・サービス種別", ""),
        ("利用者氏名", ""), ("年齢・性別・障害支援区分", ""),
        ("発生日時", "　　　年　　月　　日　　　時　　分頃"),
        ("発生場所", "□事業所内　□利用者宅　□外出先　□送迎中　□その他（　　　）"),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "2. 事故の種類")
    r = label_value_rows(ws, r, [
        ("事故種別", "□転倒・転落　□誤薬・与薬ミス　□誤嚥　□外傷　□無断外出　□自傷・他害　□交通事故　□その他"),
        ("発見者", ""), ("発見の経緯", ""),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "3. 事故の状況・対応（5W1Hで具体的に）")
    ws.merge_cells(f"A{r}:H{r+3}")
    cc=ws.cell(row=r,column=1); cc.value="（いつ・どこで・誰が・何を・なぜ・どのように。発生時の対応、受診の有無、家族への連絡時刻を記載）"
    cc.font=font(9,color=INK_MID,italic=True); cc.alignment=align("left","top")
    for rr in range(r,r+4):
        for col in range(1,9): ws.cell(row=rr,column=col).border=_border()
    r += 4
    r = blank(ws, r)
    r = section(ws, r, "4. 受診・治療")
    r = label_value_rows(ws, r, [
        ("受診の有無", "□なし　□あり（医療機関：　　　　　　　　　／診断名：　　　　　　　　）"),
        ("負傷の程度", "□なし　□軽傷　□中等度　□重傷　□死亡"),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "5. 原因分析・再発防止策")
    ws.merge_cells(f"A{r}:H{r+3}")
    for rr in range(r,r+4):
        for col in range(1,9): ws.cell(row=rr,column=col).border=_border()
    r += 4
    r = blank(ws, r)
    r = section(ws, r, "6. 報告先・確認")
    r = label_value_rows(ws, r, [
        ("行政への報告", "□京都府／市町村　報告日：　　月　　日　　　□報告不要（軽微）"),
        ("家族への報告", "□済（　　月　　日　　時）　□未"),
        ("記入者 / 管理者確認", ""),
    ], last_col="H")
    note(ws, r, "※ 重大事故（死亡・治療を要する負傷・無断外出等）は「障害福祉サービス事業者等における事故発生時の報告取扱要領」に基づき、\n"
                "　 市町村・京都府へ第一報（原則当日〜翌日）→後日詳細報告。虐待が疑われる場合は速やかに市町村虐待防止センターへ通報。")
    save(wb, F, "01_事故報告書.xlsx")

# ── 02 ヒヤリハット報告書 ───────────────────────────────────
def hiyari():
    wb, ws = new_sheet("ヒヤリハット報告書")
    set_widths(ws, {'A':14,'B':16,'C':14,'D':14,'E':14,'F':14,'G':12,'H':12})
    r = title_block(ws, "ヒヤリハット報告書", "「事故には至らなかったが、ヒヤリとした／ハッとした」事例を共有し、事故を未然に防ぐ", "H")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("報告日 / 報告者", ""),
        ("発生日時", "　　　年　　月　　日　　　時　　分頃"),
        ("発生場所", ""),
        ("対象利用者（任意）", ""),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "どんなことが起きたか（具体的に）")
    ws.merge_cells(f"A{r}:H{r+3}")
    for rr in range(r,r+4):
        for col in range(1,9): ws.cell(row=rr,column=col).border=_border()
    r += 4
    r = blank(ws, r)
    r = section(ws, r, "考えられる原因")
    ws.merge_cells(f"A{r}:H{r+2}")
    for rr in range(r,r+3):
        for col in range(1,9): ws.cell(row=rr,column=col).border=_border()
    r += 3
    r = blank(ws, r)
    r = section(ws, r, "今後の対策・気づき")
    ws.merge_cells(f"A{r}:H{r+2}")
    for rr in range(r,r+3):
        for col in range(1,9): ws.cell(row=rr,column=col).border=_border()
    r += 3
    r = label_value_rows(ws, r, [("危険度", "□低　□中　□高（事故の可能性大）"),("カンファレンスでの共有", "□済　□予定（　月　日）")], last_col="H")
    note(ws, r, "※ 責任追及ではなく「情報共有・予防」が目的。気軽に・たくさん出すことが安全文化につながります。")
    save(wb, F, "02_ヒヤリハット報告書.xlsx")

# ── 03 苦情受付記録 ─────────────────────────────────────────
def kujou():
    wb, ws = new_sheet("苦情受付記録")
    set_widths(ws, {'A':14,'B':16,'C':16,'D':16,'E':16,'F':14,'G':14})
    r = title_block(ws, "苦情受付・解決記録", "障害者総合支援法に基づき、苦情解決の体制整備と記録の保存が必要", "G")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("受付日時", ""), ("受付方法", "□来所　□電話　□文書　□メール　□その他"),
        ("申出人", "□利用者本人　□家族　□その他（続柄：　　　）"),
        ("苦情受付担当者", ""), ("第三者委員への報告", "□要　□不要　／　報告日："),
    ], last_col="G")
    r = blank(ws, r)
    r = section(ws, r, "苦情の内容", "G")
    ws.merge_cells(f"A{r}:G{r+3}")
    for rr in range(r,r+4):
        for col in range(1,8): ws.cell(row=rr,column=col).border=_border()
    r += 4
    r = blank(ws, r)
    r = section(ws, r, "対応・解決の経過", "G")
    ws.merge_cells(f"A{r}:G{r+3}")
    for rr in range(r,r+4):
        for col in range(1,8): ws.cell(row=rr,column=col).border=_border()
    r += 4
    r = label_value_rows(ws, r, [
        ("申出人への回答日 / 方法", ""),
        ("解決状況", "□解決　□継続対応中　□行政・運営適正化委員会へ"),
        ("再発防止に向けた改善", ""),
    ], last_col="G")
    note(ws, r, "※ 苦情受付担当者・苦情解決責任者・第三者委員を運営規程と重要事項説明書に明記すること。\n"
                "　 解決が困難な場合は京都府運営適正化委員会（社会福祉協議会）へ。", last_col="G")
    save(wb, F, "03_苦情受付記録.xlsx")

# ── 04 緊急連絡先一覧 ───────────────────────────────────────
def kinkyu():
    wb, ws = new_sheet("緊急連絡先一覧")
    set_widths(ws, {'A':22,'B':26,'C':22,'D':30})
    r = title_block(ws, "緊急連絡先一覧", "事務所内に常時掲示。災害・急変時にすぐ参照できるようにする（個人情報の取扱いに注意）", "D")
    r = blank(ws, r)
    r = section(ws, r, "1. 関係機関", "D")
    r = table_header(ws, r, ["区分","名称","電話番号","備考"])
    r = table_rows(ws, r, 4, n=8, sample=[
        ["主治医・協力医療機関","","",""],
        ["救急（消防）","","119",""],
        ["京都府 障害者支援課","","075-414-4600",""],
        ["市町村 障害福祉担当","","",""],
        ["国保連（請求）","","075-354-9070",""],
        ["地域包括／相談支援","","",""],
        ["警察","","110",""],
        ["最寄り避難所","","",""],
    ])
    r = blank(ws, r)
    r = section(ws, r, "2. 利用者・家族 緊急連絡", "D")
    r = table_header(ws, r, ["利用者氏名","緊急連絡先（続柄）","電話番号","かかりつけ医・服薬等"])
    r = table_rows(ws, r, 4, n=8)
    note(ws, r, "※ 掲示・保管時は施錠管理。災害時持ち出し用に1部準備。年1回内容を更新。", last_col="D")
    save(wb, F, "04_緊急連絡先一覧.xlsx")

# ── 05 職員名簿・資格証台帳 ─────────────────────────────────
def shokuin():
    wb, ws = new_sheet("職員名簿・資格台帳")
    set_widths(ws, {'A':16,'B':10,'C':14,'D':16,'E':14,'F':14,'G':14,'H':12,'I':16,'J':14})
    r = title_block(ws, "職員名簿・資格証台帳", "実地指導で確認される人員配置・資格要件の根拠資料。資格証の写しを別途保管", "J")
    r = blank(ws, r)
    r = table_header(ws, r, ["氏名","職種","雇用形態","保有資格","資格登録番号","常勤換算","入職日","退職日","研修受講状況","備考"])
    r = table_rows(ws, r, 10, n=14, sample=[
        ["（例）山田花子","看護師","常勤","正看護師","第○○号","1.0","2024/04/01","","virtual等修了",""],
        ["（例）佐藤太郎","サビ管","常勤","サービス管理責任者","","1.0","2023/10/01","","基礎/実践研修修了",""],
    ])
    note(ws, r, "※ 管理者・サービス管理責任者・児発管・看護職員・生活支援員等の配置と資格を最新に保つ。\n"
                "　 サビ管は5年ごとの更新研修、強度行動障害・喀痰吸引等の研修修了も記録。", last_col="J")
    save(wb, F, "05_職員名簿・資格証台帳.xlsx")

# ── 06 研修受講記録 ─────────────────────────────────────────
def kenshu():
    wb, ws = new_sheet("研修受講記録")
    set_widths(ws, {'A':14,'B':28,'C':12,'D':16,'E':16,'F':20})
    r = title_block(ws, "研修受講記録", "虐待防止・身体拘束適正化・感染症・BCP等の法定研修は年間計画に基づき実施・記録", "F")
    r = blank(ws, r)
    r = section(ws, r, "年間で実施が求められる主な研修（障害福祉）", "F")
    note(ws, r, "虐待防止研修（年1回以上）／身体拘束適正化研修（年1回以上）／感染症・食中毒予防研修（年1回以上）／"
                "BCP研修（年1回以上）／衛生・安全／個人情報保護　※委員会の設置・指針整備とセットで義務", last_col="F", rowh=44)
    r += 1 - 1
    r = blank(ws, r)
    r = table_header(ws, r, ["実施日","研修テーマ","形式","講師・主催","参加者数","記録・資料の保管"])
    r = table_rows(ws, r, 6, n=12, sample=[
        ["（例）2025/05/20","高齢者・障害者虐待防止","内部","管理者","8","資料・出席簿あり"],
    ])
    note(ws, r, "※ 未受講者には個別にフォロー（資料回覧・後日視聴）。出席簿・使用資料・理解度確認を一緒に保管。", last_col="F")
    save(wb, F, "06_研修受講記録.xlsx")

# ── 07 勤務シフト表（勤務形態一覧表）──────────────────────
def shift():
    wb, ws = new_sheet("勤務シフト表")
    cols = {'A':16,'B':10,'C':8}
    for i in range(31): cols[get_column_letter(4+i)] = 3.4
    cols[get_column_letter(4+31)] = 8
    set_widths(ws, cols)
    last = get_column_letter(4+31)
    r = title_block(ws, "勤務形態一覧表（月間シフト）", "　　　　年　　月分　／　常勤換算・人員基準の確認資料。実地指導で提出を求められる", last)
    r = blank(ws, r)
    # 日付ヘッダー
    ws.cell(row=r,column=1).value="氏名"; ws.cell(row=r,column=2).value="職種"; ws.cell(row=r,column=3).value="区分"
    for d in range(1,32): ws.cell(row=r,column=3+d).value=d
    ws.cell(row=r,column=4+31).value="合計h"
    for col in range(1,4+32):
        c=ws.cell(row=r,column=col); c.fill=_fill(GOLD); c.font=font(9,bold=True,color=WHITE)
        c.alignment=align("center","center"); c.border=_border(GOLD)
    ws.row_dimensions[r].height=20
    r+=1
    r = table_rows(ws, r, 4+32, n=14, rowh=20)
    note(ws, r, "※ 記号例：● 日勤 ／ ▲ 早出 ／ ▼ 遅出 ／ 夜 夜勤 ／ 公 公休 ／ 有 有給。常勤換算数＝常勤者の勤務すべき時間で職員の総勤務時間を除して算出。", last_col=last)
    save(wb, F, "07_勤務シフト表.xlsx")

# ── 08 利用者負担額管理表 ───────────────────────────────────
def futan():
    wb, ws = new_sheet("利用者負担額管理")
    set_widths(ws, {'A':16,'B':14,'C':14,'D':16,'E':16,'F':16,'G':14})
    r = title_block(ws, "利用者負担額管理表", "　　　　年　　月分　／　原則1割・所得区分別の負担上限月額を管理。上限額管理事業所は他事業所分も合算", "G")
    r = blank(ws, r)
    r = section(ws, r, "負担上限月額（障害福祉サービス・参考）", "G")
    note(ws, r, "生活保護：0円 ／ 低所得（市町村民税非課税）：0円 ／ 一般1（市町村民税課税・概ね収入600万円以下、"
                "障害児や20歳未満等）：4,600円 ／ 一般2：37,200円　※最新の区分・要件は受給者証で確認", last_col="G", rowh=44)
    r = blank(ws, r)
    r = table_header(ws, r, ["利用者氏名","所得区分","負担上限月額","当月利用者負担額","上限額管理結果","他事業所利用","備考"])
    r = table_rows(ws, r, 7, n=12)
    note(ws, r, "※ 上限額管理対象者は、月初に各事業所の負担額を集計し「利用者負担上限額管理結果票」を作成・共有する。", last_col="G")
    save(wb, F, "08_利用者負担額管理表.xlsx")

# ── 09 体制届チェックシート ─────────────────────────────────
def taisei():
    wb, ws = new_sheet("体制届チェック")
    set_widths(ws, {'A':26,'B':18,'C':12,'D':12,'E':18,'F':18})
    r = title_block(ws, "体制届チェックシート", "加算の体制届は算定開始月の前月末日までに提出。未提出での算定は不正請求となる", "F")
    r = blank(ws, r)
    note(ws, r, "【重要】体制等状況一覧表＋各加算の届出書を、国保連・支払基金（医療）／市町村・京都府（障害福祉）へ前月末までに提出。", last_col="F", rowh=30)
    r = blank(ws, r)
    r = table_header(ws, r, ["加算名","算定額/単位（参考）","届出日","算定開始月","要件充足の確認","次回更新・注意"])
    r = table_rows(ws, r, 6, n=12, sample=[
        ["福祉・介護職員等処遇改善加算（Ⅰ）","基本報酬×サービス別率","","","計画書提出・職場環境整備（旧3加算は一本化）","毎年4/15計画・7/31実績"],
        ["24時間対応体制加算（訪問看護）","ロ6,520円／イ6,800円（月）","","","24時間連絡・緊急訪問体制（イは負担軽減2項目以上）","体制変更時に届出"],
        ["特別管理加算（訪問看護）","Ⅰ5,000円／Ⅱ2,500円（月）","","","対象疾患・医療処置の確認","—"],
        ["目標工賃達成加算（B型）","10単位/日","","","前年度平均工賃が目標以上","毎年度確認"],
        ["福祉専門職員配置等加算（Ⅰ）","15単位/日","","","有資格者比率25%以上","職員変更時に再確認"],
        ["就労移行支援体制加算","27〜100単位/日等","","","前年度の一般就労実績","毎年4月届出"],
    ])
    note(ws, r, "※ 金額・単位は令和6年度（2024年度）改定後の参考値。令和8年度（2026年6月）改定後の値は最新告示で確認。", last_col="F")
    save(wb, F, "09_体制届チェックシート.xlsx")

# ── 10 管理者業務日誌 ───────────────────────────────────────
def nisshi():
    wb, ws = new_sheet("管理者業務日誌")
    set_widths(ws, {'A':14,'B':18,'C':18,'D':18,'E':16,'F':16,'G':14})
    r = title_block(ws, "管理者業務日誌", "　　　　年　　月　　日（　）天候：　　　／　日々の運営・人員・利用状況・連絡事項を記録", "G")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("本日の利用者数 / 予定", ""),
        ("出勤職員 / 欠勤・代替", ""),
        ("送迎の状況", ""),
    ], last_col="G")
    r = blank(ws, r)
    r = section(ws, r, "業務・サービス提供の状況", "G")
    ws.merge_cells(f"A{r}:G{r+3}")
    for rr in range(r,r+4):
        for col in range(1,8): ws.cell(row=rr,column=col).border=_border()
    r += 4
    r = blank(ws, r)
    r = section(ws, r, "特記事項（事故・ヒヤリ・苦情・体調変化・連絡事項）", "G")
    ws.merge_cells(f"A{r}:G{r+3}")
    for rr in range(r,r+4):
        for col in range(1,8): ws.cell(row=rr,column=col).border=_border()
    r += 4
    r = label_value_rows(ws, r, [
        ("申し送り事項", ""),
        ("記入者 / 管理者確認", ""),
    ], last_col="G")
    note(ws, r, "※ 事故・ヒヤリ・苦情があった日は各専用様式にも記録し相互参照。翌日の朝礼で申し送り。", last_col="G")
    save(wb, F, "10_管理者業務日誌.xlsx")

def main():
    print(f"=== {F} 生成 ===")
    jiko_houkoku(); hiyari(); kujou(); kinkyu(); shokuin()
    kenshu(); shift(); futan(); taisei(); nisshi()
    print("=== 完了 ===")

if __name__ == "__main__":
    main()

# -*- coding: utf-8 -*-
"""02_訪問看護記録様式 — オリジナル様式（公式の別紙様式1・指示書を除く）"""
from tpl_common import *
from tpl_common import _border, _fill, _side

F = "02_訪問看護記録様式"

def free_block(ws, r, rows, last_col="H", hint=""):
    n=column_index(last_col)
    if hint:
        cc=ws.cell(row=r,column=1); cc.value=hint
        cc.font=font(9,color=INK_MID,italic=True); cc.alignment=align("left","top")
    for rr in range(r, r+rows):
        for col in range(1, n+1): ws.cell(row=rr,column=col).border=_border()
    return r+rows

# 06 記録書Ⅰ（フェイスシート）
def face():
    wb, ws = new_sheet("フェイスシート")
    set_widths(ws, {'A':14,'B':16,'C':14,'D':16,'E':14,'F':14,'G':12,'H':12})
    r = title_block(ws, "訪問看護記録書Ⅰ（基本情報・フェイスシート）", "利用者の基本情報・主治医・緊急連絡・既往等を一覧化。初回作成し変更都度更新", "H")
    r = blank(ws, r)
    r = section(ws, r, "1. 利用者基本情報")
    r = label_value_rows(ws, r, [
        ("氏名 / フリガナ", ""), ("生年月日 / 年齢", ""),
        ("性別 / 障害支援区分", ""), ("住所", ""), ("電話", ""),
        ("保険種別", "□医療保険　□介護保険　□障害福祉（自立支援医療等）"),
        ("受給者証番号 / 負担割合", ""),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "2. 主治医・関係機関")
    r = label_value_rows(ws, r, [
        ("主治医 / 医療機関", ""), ("指示書の種類・期間", "□訪問看護指示書　□特別指示書　□精神科訪問看護指示書"),
        ("相談支援専門員", ""), ("ケアマネ等", ""),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "3. 緊急連絡先・家族構成")
    r = label_value_rows(ws, r, [
        ("緊急連絡先①（続柄）", ""), ("緊急連絡先②（続柄）", ""),
        ("家族構成・キーパーソン", ""),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "4. 健康・医療情報")
    r = label_value_rows(ws, r, [
        ("主たる傷病名", ""), ("既往歴", ""), ("ADL・要介護度", ""),
        ("医療処置", "□吸引　□経管栄養　□在宅酸素　□カテーテル　□インスリン　□褥瘡処置　□その他"),
        ("アレルギー・禁忌", ""), ("サービス提供日・頻度", "週　　回　／　曜日："),
    ], last_col="H")
    note(ws, r, "※ 個人情報保護方針に基づき施錠管理。記載内容に変更があれば速やかに更新し、変更日を記録すること。")
    save(wb, F, "06_訪問看護記録書Ⅰ（フェイスシート）.xlsx")

# 03 記録書Ⅱ（経過記録）
def keika():
    wb, ws = new_sheet("経過記録")
    set_widths(ws, {'A':12,'B':10,'C':12,'D':10,'E':10,'F':10,'G':22,'H':22,'I':12})
    r = title_block(ws, "訪問看護記録書Ⅱ（経過記録）", "訪問ごとにバイタル・観察・実施したケア・利用者の状態・特記を記録（指示書に沿った内容）", "I")
    r = blank(ws, r)
    r = table_header(ws, r, ["訪問日","時間","体温","血圧","脈拍","SpO2","観察・状態","実施したケア・指導","記録者"])
    r = table_rows(ws, r, 9, n=16, rowh=30, sample=[
        ["（例）6/2","10:00","36.4","128/78","72","98%","顔色良好。食欲あり。","服薬確認・血圧測定・清拭。次回まで水分摂取を促す。","看護師A"],
    ])
    note(ws, r, "※ 記録は客観的事実を中心に。指示内容・利用者や家族の反応・次回への申し送りも記載。改ざん防止のため修正は二重線＋訂正印。", last_col="I")
    save(wb, F, "03_訪問看護記録書Ⅱ経過記録.xlsx")

# 04 訪問看護報告書（主治医向け・月次）
def houkoku():
    wb, ws = new_sheet("訪問看護報告書")
    set_widths(ws, {'A':14,'B':16,'C':14,'D':16,'E':14,'F':14,'G':12,'H':12})
    r = title_block(ws, "訪問看護報告書", "主治医へ月1回提出。訪問日・病状・看護内容・家庭での療養状況等を報告（別紙様式2に準拠）", "H")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("利用者氏名 / 生年月日", ""), ("報告対象月", "　　　年　　月分"),
        ("主治医 / 医療機関", ""), ("訪問日（当月）", ""),
        ("訪問回数 / うち緊急", ""),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "病状の経過")
    r = free_block(ws, r, 3)
    r = blank(ws, r)
    r = section(ws, r, "看護・リハビリテーションの内容")
    r = free_block(ws, r, 3)
    r = blank(ws, r)
    r = section(ws, r, "家庭での療養状況・介護状況")
    r = free_block(ws, r, 3)
    r = blank(ws, r)
    r = section(ws, r, "衛生材料等の使用・特記事項")
    r = free_block(ws, r, 2)
    r = label_value_rows(ws, r, [("作成者 / 提出日", ""), ("管理者確認", "")], last_col="H")
    note(ws, r, "※ 主治医の指示書の有効期間内に提供したサービスについて報告。特別管理加算等の対象は処置内容を具体的に記載。")
    save(wb, F, "04_訪問看護報告書.xlsx")

# 05 サービス提供実績記録（月次）
def jisseki():
    wb, ws = new_sheet("提供実績記録")
    cols={'A':16,'B':6}
    for i in range(31): cols[get_column_letter(3+i)]=3.2
    cols[get_column_letter(3+31)]=8
    set_widths(ws, cols)
    last=get_column_letter(3+31)
    r = title_block(ws, "サービス提供実績記録（月次）", "　　　年　　月分　／　提供日・サービス内容・算定加算を記録。請求の根拠資料", last)
    r = blank(ws, r)
    ws.cell(row=r,column=1).value="利用者氏名"; ws.cell(row=r,column=2).value="区分"
    for d in range(1,32): ws.cell(row=r,column=2+d).value=d
    ws.cell(row=r,column=3+31).value="合計回"
    for col in range(1,3+32):
        c=ws.cell(row=r,column=col); c.fill=_fill(GOLD); c.font=font(9,bold=True,color=WHITE)
        c.alignment=align("center","center"); c.border=_border(GOLD)
    ws.row_dimensions[r].height=20
    r+=1
    r = table_rows(ws, r, 3+32, n=14, rowh=20)
    note(ws, r, "※ 記号例：● 提供 ／ 緊 緊急訪問 ／ 複 複数名 ／ 長 長時間 ／ 中 中止。月末に合計を集計し請求データと突合。", last_col=last)
    save(wb, F, "05_サービス提供実績記録（月次）.xlsx")

# 09 精神科訪問看護計画書
def seishin_keikaku():
    wb, ws = new_sheet("精神科訪問看護計画書")
    set_widths(ws, {'A':14,'B':16,'C':14,'D':16,'E':14,'F':14,'G':12,'H':12})
    r = title_block(ws, "精神科訪問看護計画書（参考様式・別紙様式3準拠）", "精神科訪問看護指示書に基づき、療養上の目標・支援内容を計画", "H")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("利用者氏名 / 生年月日", ""), ("主たる精神疾患", ""),
        ("精神科主治医 / 医療機関", ""), ("指示期間", ""),
        ("訪問頻度", "週　　回（　　　　曜）／ 1回　　分"),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "看護・支援の目標（本人の希望を踏まえて）")
    r = free_block(ws, r, 2)
    r = blank(ws, r)
    r = section(ws, r, "支援内容（症状観察・服薬支援・生活支援・社会資源活用 等）")
    r = free_block(ws, r, 4)
    r = blank(ws, r)
    r = section(ws, r, "リスク・緊急時対応")
    r = free_block(ws, r, 2)
    r = label_value_rows(ws, r, [("作成日 / 作成者", ""),("本人・家族への説明 / 同意", "□説明済　□同意取得（署名別紙）")], last_col="H")
    note(ws, r, "※ ストレングス（本人の強み）に着目し、回復（リカバリー）を支える視点で計画。多職種・相談支援と連携。")
    save(wb, F, "09_精神科訪問看護計画書（別紙様式3準拠）.xlsx")

# 10 精神科訪問看護報告書
def seishin_houkoku():
    wb, ws = new_sheet("精神科訪問看護報告書")
    set_widths(ws, {'A':14,'B':16,'C':14,'D':16,'E':14,'F':14,'G':12,'H':12})
    r = title_block(ws, "精神科訪問看護報告書（参考様式・別紙様式4準拠）", "精神科主治医へ月1回報告。症状・服薬・生活状況・GAF等を記載", "H")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("利用者氏名 / 生年月日", ""), ("報告対象月", "　　　年　　月分"),
        ("精神科主治医", ""), ("訪問日 / 回数", ""),
        ("GAF尺度（当月）", ""),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "症状・精神状態の経過")
    r = free_block(ws, r, 3)
    r = blank(ws, r)
    r = section(ws, r, "服薬状況・生活状況")
    r = free_block(ws, r, 3)
    r = blank(ws, r)
    r = section(ws, r, "今後の課題・主治医への相談事項")
    r = free_block(ws, r, 2)
    r = label_value_rows(ws, r, [("作成者 / 提出日", "")], last_col="H")
    note(ws, r, "※ GAF（機能の全体的評定）は精神科訪問看護の算定・評価で用いる。客観的事実と本人の言葉を分けて記載。")
    save(wb, F, "10_精神科訪問看護報告書（別紙様式4準拠）.xlsx")

# 11 退院前カンファレンス記録
def taiin_conf():
    wb, ws = new_sheet("退院前カンファレンス")
    set_widths(ws, {'A':16,'B':18,'C':18,'D':18,'E':16,'F':14,'G':12})
    r = title_block(ws, "退院前カンファレンス記録", "入院先・本人家族・在宅サービスで退院後の支援を調整。退院時共同指導加算の根拠資料", "G")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("開催日時 / 場所", ""), ("利用者氏名", ""),
        ("入院医療機関 / 病棟", ""), ("退院（予定）日", ""),
    ], last_col="G")
    r = blank(ws, r)
    r = section(ws, r, "出席者", "G")
    r = table_header(ws, r, ["所属・機関","職種","氏名","役割",""," ",""])
    r = table_rows(ws, r, 7, n=6, rowh=20)
    r = blank(ws, r)
    r = section(ws, r, "病状・退院後の医療処置・指導内容", "G")
    r = free_block(ws, r, 4, last_col="G")
    r = blank(ws, r)
    r = section(ws, r, "在宅での支援体制・役割分担・次回確認事項", "G")
    r = free_block(ws, r, 3, last_col="G")
    r = label_value_rows(ws, r, [("記録者", ""),("退院時共同指導加算", "□算定（特別管理対象は16,000円／通常8,000円）　□算定なし")], last_col="G")
    note(ws, r, "※ 退院時共同指導加算は、入院中に医療機関職員と共同で在宅療養上の指導を行い文書提供した場合に算定。", last_col="G")
    save(wb, F, "11_退院前カンファレンス記録.xlsx")

# 12 居宅介護サービス提供記録
def kyotaku_kiroku():
    wb, ws = new_sheet("居宅介護提供記録")
    set_widths(ws, {'A':11,'B':9,'C':9,'D':10,'E':22,'F':22,'G':10,'H':10,'I':10,'J':10,'K':10,'L':10,'M':10})
    r = title_block(ws, "居宅介護 サービス提供記録", "身体介護・家事援助・通院等介助の提供実績。サービス提供責任者が管理し請求の根拠とする", "M")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [("利用者氏名", ""),("対象月", "　　年　　月分")], label_col="A", label_w=2, last_col="F")
    r = blank(ws, r)
    r = table_header(ws, r, ["提供日","開始","終了","区分","支援内容","利用者の状況・特記","ヘルパー","本人確認","","","","",""])
    r = table_rows(ws, r, 8, n=14, rowh=26, sample=[
        ["（例）6/2","9:00","10:00","身体","起床介助・整容・服薬確認","体調良好","B","印"],
    ])
    note(ws, r, "※ 区分：身体介護／家事援助／通院等介助（身体を伴う・伴わない）／通院等乗降介助。算定区分と時間に整合させる。サービス提供責任者が点検。", last_col="M")
    save(wb, F, "12_居宅介護サービス提供記録.xlsx")

def main():
    print(f"=== {F} 生成 ===")
    face(); keika(); houkoku(); jisseki()
    seishin_keikaku(); seishin_houkoku(); taiin_conf(); kyotaku_kiroku()
    print("=== 完了 ===")

if __name__ == "__main__":
    main()

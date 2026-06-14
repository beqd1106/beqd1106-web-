# -*- coding: utf-8 -*-
"""03_就労支援記録様式 — オリジナル様式（公式の京都府様式を除く）"""
from tpl_common import *
from tpl_common import _border, _fill, _side

F = "03_就労支援記録様式"

def free_block(ws, r, rows, last_col="H"):
    n=column_index(last_col)
    for rr in range(r, r+rows):
        for col in range(1, n+1): ws.cell(row=rr,column=col).border=_border()
    return r+rows

# 06 個別支援計画書（就労継続支援版）
def keikaku_shuro():
    wb, ws = new_sheet("個別支援計画(就労)")
    set_widths(ws, {'A':14,'B':16,'C':14,'D':16,'E':14,'F':14,'G':12,'H':12})
    r = title_block(ws, "個別支援計画書（就労継続支援A型・B型）", "サービス管理責任者が作成。アセスメント→本人の意向→目標→支援内容→モニタリング時期を明記（基準省令）", "H")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("利用者氏名 / 生年月日", ""), ("サービス種別", "□就労継続支援A型　□就労継続支援B型"),
        ("作成日 / 計画期間", ""), ("サービス管理責任者", ""),
        ("障害支援区分 / 受給者証番号", ""),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "本人・家族の意向（ご本人の言葉で）")
    r = free_block(ws, r, 2)
    r = blank(ws, r)
    r = section(ws, r, "総合的な支援の方針")
    r = free_block(ws, r, 2)
    r = blank(ws, r)
    r = section(ws, r, "支援目標と具体的支援内容")
    r = table_header(ws, r, ["項目","長期目標","短期目標","具体的な支援内容","担当","達成時期","",""])
    r = table_rows(ws, r, 8, n=5, rowh=34, sample=[
        ["作業面","","","","","",],
        ["生活面","","","","","",],
        ["対人・社会","","","","","",],
    ])
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("工賃／賃金向上の目標", ""),
        ("一般就労に向けた支援（任意）", ""),
        ("モニタリング時期", "□3か月ごと　□6か月ごと　□その他"),
        ("本人同意（署名・日付）", ""),
    ], last_col="H")
    note(ws, r, "※ 個別支援計画は本人へ説明・同意・交付が必須。アセスメント→原案→担当者会議→本人同意→交付→モニタリングの流れ。未作成・未交付は減算対象。")
    save(wb, F, "06_個別支援計画書（就労継続支援版）.xlsx")

# 13 個別支援計画書（居宅介護版）
def keikaku_kyotaku():
    wb, ws = new_sheet("個別支援計画(居宅)")
    set_widths(ws, {'A':14,'B':16,'C':14,'D':16,'E':14,'F':14,'G':12,'H':12})
    r = title_block(ws, "個別支援計画書（居宅介護・重度訪問介護等）", "サービス提供責任者が作成。身体介護・家事援助等の目標と手順を具体化", "H")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("利用者氏名 / 生年月日", ""), ("サービス種別", "□居宅介護　□重度訪問介護　□同行援護　□行動援護"),
        ("障害支援区分", ""), ("作成日 / 計画期間", ""),
        ("サービス提供責任者", ""),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "本人・家族の意向 / 生活上の課題")
    r = free_block(ws, r, 2)
    r = blank(ws, r)
    r = section(ws, r, "支援目標・援助内容・手順")
    r = table_header(ws, r, ["生活場面","目標","支援内容・手順","所要時間","留意点","","",""])
    r = table_rows(ws, r, 8, n=6, rowh=30)
    r = label_value_rows(ws, r, [
        ("週間サービス提供計画", "曜日・時間帯："),
        ("緊急時・連絡体制", ""),
        ("本人同意（署名・日付）", ""),
    ], last_col="H")
    note(ws, r, "※ 重度訪問介護は長時間の見守り含む。行動援護・同行援護は対象者要件・ヘルパー資格要件を満たすこと。")
    save(wb, F, "13_個別支援計画書（居宅介護版）.xlsx")

# 10 アセスメント票
def assessment():
    wb, ws = new_sheet("アセスメント")
    set_widths(ws, {'A':16,'B':18,'C':18,'D':18,'E':14,'F':12,'G':12,'H':12})
    r = title_block(ws, "アセスメントシート（就労支援・生活支援・心身機能）", "個別支援計画の前提となる情報収集。本人の強み（ストレングス）も把握", "H")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("氏名 / 生年月日", ""), ("実施日 / 実施者", ""),
        ("情報源", "□本人　□家族　□相談支援　□医療機関　□前事業所"),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "1. 心身の状況・健康・服薬")
    r = free_block(ws, r, 2)
    r = section(ws, r, "2. 日常生活（ADL/IADL）・生活リズム")
    r = free_block(ws, r, 2)
    r = section(ws, r, "3. コミュニケーション・対人関係")
    r = free_block(ws, r, 2)
    r = section(ws, r, "4. 作業能力・職業適性・就労経験")
    r = free_block(ws, r, 2)
    r = section(ws, r, "5. 本人の希望・強み（ストレングス）・興味関心")
    r = free_block(ws, r, 2)
    r = section(ws, r, "6. 支援上の課題とニーズの整理")
    r = free_block(ws, r, 2)
    note(ws, r, "※ できないことだけでなく「できること・好きなこと」を重視。本人参加で作成し、定期的に再アセスメントする。")
    save(wb, F, "10_アセスメント票.xlsx")

# 09 支援記録日報
def nippo():
    wb, ws = new_sheet("支援記録日報")
    set_widths(ws, {'A':12,'B':10,'C':10,'D':24,'E':24,'F':12,'G':12,'H':10,'I':10,'J':10,'K':10})
    r = title_block(ws, "支援記録日報（就労継続支援A型・B型）", "　　年　　月　　日（　）／ 出欠・作業内容・本人の様子・特記を記録。請求と整合させる", "K")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [("本日の活動 / 生産活動", ""),("記録者", "")], label_col="A", label_w=2, last_col="F")
    r = blank(ws, r)
    r = table_header(ws, r, ["利用者氏名","出欠","利用時間","作業内容","本人の様子・支援内容","送迎","食事","加算","","",""])
    r = table_rows(ws, r, 11, n=14, rowh=26, sample=[
        ["（例）田中","出","10-15","部品組立","集中して取り組めた。声かけで休憩。","往復","有","—"],
    ])
    note(ws, r, "※ 出欠：出／欠／中途。欠席時対応加算（電話連絡等・月4回まで94単位/回）を算定する場合は記録必須。送迎・食事提供の加算も整合確認。", last_col="K")
    save(wb, F, "09_支援記録日報（A型B型）.xlsx")

# 07 工賃台帳（B型）
def kochin():
    wb, ws = new_sheet("工賃台帳B型")
    set_widths(ws, {'A':16,'B':12,'C':12,'D':12,'E':12,'F':12,'G':12,'H':14})
    r = title_block(ws, "工賃台帳（就労継続支援B型）", "　　年度／利用者ごとの月別工賃を記録。平均工賃月額は基本報酬区分・目標工賃達成加算の根拠", "H")
    r = blank(ws, r)
    r = section(ws, r, "利用者別 月額工賃（円）")
    r = table_header(ws, r, ["利用者氏名","4月","5月","6月","7月","8月","9月","上半期計"])
    r = table_rows(ws, r, 8, n=10, rowh=22)
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("当年度 平均工賃月額", "　　　　円　（＝工賃総額 ÷ 延べ利用者数）"),
        ("前年度実績 / 目標工賃", ""),
        ("目標工賃達成加算", "□算定（10単位/日・前年度平均が目標以上）　□算定なし"),
    ], last_col="H")
    note(ws, r, "※ 平均工賃月額は「工賃総支払額 ÷ 利用者延べ人数」で算定。月額3,000円以上が支払いの下限目安。"
                "工賃向上計画を都道府県へ提出し、達成で目標工賃達成加算（10単位/日）。", last_col="H")
    save(wb, F, "07_工賃台帳（B型）.xlsx")

# 11 賃金台帳（A型）
def chingin():
    wb, ws = new_sheet("賃金台帳A型")
    set_widths(ws, {'A':16,'B':10,'C':12,'D':12,'E':12,'F':12,'G':12,'H':12,'I':12})
    r = title_block(ws, "賃金台帳（就労継続支援A型）", "　　年　　月分／雇用契約に基づく賃金を記録。最低賃金以上の支払いが必須（労働基準法の賃金台帳）", "I")
    r = blank(ws, r)
    r = table_header(ws, r, ["氏名","労働時間","時給","基本賃金","諸手当","控除","差引支給額","支払日","受領印"])
    r = table_rows(ws, r, 9, n=12, rowh=22)
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("適用最低賃金（京都府・時間額）", "　　　　円　※毎年10月頃改定。最新額を必ず確認"),
        ("生産活動収益からの賃金支払", "原則、生産活動収益から賃金を支払う（賃金向上計画の対象）"),
    ], last_col="I")
    note(ws, r, "※ A型は雇用契約のため労働基準法・最低賃金法が適用。賃金台帳・労働者名簿・出勤簿の整備が必要。"
                "京都府の地域別最低賃金は毎年改定されるため、施行月に時給を点検すること。", last_col="I")
    save(wb, F, "11_賃金台帳（A型）.xlsx")

# 08 生産活動収支記録
def seisan():
    wb, ws = new_sheet("生産活動収支")
    set_widths(ws, {'A':20,'B':14,'C':14,'D':14,'E':14,'F':14,'G':14})
    r = title_block(ws, "生産活動収支記録（A型・B型）", "　　年度／生産活動の収入・経費・剰余を記録。A型は賃金、B型は工賃の原資", "G")
    r = blank(ws, r)
    r = section(ws, r, "収入", "G")
    r = table_header(ws, r, ["項目","上期","下期","年度計","","",""])
    r = table_rows(ws, r, 7, n=5, rowh=22, sample=[["受注作業（請負）"],["自主製品販売"],["役務提供"]])
    r = blank(ws, r)
    r = section(ws, r, "経費", "G")
    r = table_header(ws, r, ["項目","上期","下期","年度計","","",""])
    r = table_rows(ws, r, 7, n=6, rowh=22, sample=[["材料・仕入"],["外注費"],["設備・消耗品"],["その他"]])
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("生産活動収支（収入−経費）", "　　　　円"),
        ("賃金/工賃への充当額", "　　　　円"),
    ], last_col="G")
    note(ws, r, "※ A型は生産活動収益から賃金を支払うのが原則（不足を訓練等給付費から充てることは原則不可）。"
                "B型は工賃の原資。収支は工賃向上計画・実地指導で確認される。", last_col="G")
    save(wb, F, "08_生産活動収支記録.xlsx")

def main():
    print(f"=== {F} 生成 ===")
    keikaku_shuro(); keikaku_kyotaku(); assessment(); nippo()
    kochin(); chingin(); seisan()
    print("=== 完了 ===")

if __name__ == "__main__":
    main()

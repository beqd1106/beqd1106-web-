# -*- coding: utf-8 -*-
"""04_相談支援様式 — オリジナル様式（公式の参考様式を除く）"""
from tpl_common import *
from tpl_common import _border, _fill, _side

F = "04_相談支援様式"

def free_block(ws, r, rows, last_col="H"):
    n=column_index(last_col)
    for rr in range(r, r+rows):
        for col in range(1, n+1): ws.cell(row=rr,column=col).border=_border()
    return r+rows

# 01 サービス等利用計画書
def riyou_keikaku():
    wb, ws = new_sheet("サービス等利用計画")
    set_widths(ws, {'A':14,'B':16,'C':14,'D':16,'E':14,'F':14,'G':12,'H':12})
    r = title_block(ws, "サービス等利用計画", "計画相談支援。本人の希望する生活に向けた総合的な支援計画（特定相談支援事業者が作成）", "H")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("利用者氏名 / 生年月日", ""), ("障害支援区分 / 受給者証番号", ""),
        ("相談支援事業所 / 相談支援専門員", ""), ("計画作成日 / モニタリング期間", ""),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "利用者及び家族の生活に対する意向（希望する生活）")
    r = free_block(ws, r, 2)
    r = section(ws, r, "総合的な援助の方針")
    r = free_block(ws, r, 2)
    r = blank(ws, r)
    r = section(ws, r, "解決すべき課題と支援目標・サービス")
    r = table_header(ws, r, ["解決すべき課題","支援目標","達成時期","福祉サービス等の種類・量","提供事業者","本人の役割",""," "])
    r = table_rows(ws, r, 8, n=6, rowh=32)
    r = label_value_rows(ws, r, [
        ("週間計画 / 主な日常の活動", ""),
        ("本人同意（署名・日付）", ""),
    ], last_col="H")
    note(ws, r, "※ サービス等利用計画は支給決定の前提。アセスメント→計画案→サービス担当者会議→支給決定→本計画交付→モニタリングの流れ。")
    save(wb, F, "01_サービス等利用計画書.xlsx")

# 02 モニタリング報告書
def monitoring():
    wb, ws = new_sheet("モニタリング報告書")
    set_widths(ws, {'A':14,'B':16,'C':14,'D':16,'E':14,'F':14,'G':12,'H':12})
    r = title_block(ws, "モニタリング報告書（継続サービス利用支援）", "計画の達成状況を定期確認。支給決定期間・本人状況により頻度を設定（標準は3〜6か月等）", "H")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("利用者氏名", ""), ("モニタリング実施日", ""),
        ("相談支援専門員", ""), ("前回計画作成日", ""),
        ("実施方法", "□自宅訪問　□来所　□電話　□その他"),
    ], last_col="H")
    r = blank(ws, r)
    r = section(ws, r, "支援目標ごとの達成状況・本人の感想")
    r = table_header(ws, r, ["支援目標","サービス提供状況","達成度","本人・家族の評価","今後の課題","見直し要否",""," "])
    r = table_rows(ws, r, 8, n=6, rowh=32)
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("計画変更の必要性", "□現計画を継続　□計画の見直しが必要（理由：　　　　　　）"),
        ("次回モニタリング予定", ""),
    ], last_col="H")
    note(ws, r, "※ モニタリング結果は支給決定市町村へ提出。状況変化があれば計画を見直し、必要に応じてサービス担当者会議を再開催。")
    save(wb, F, "02_モニタリング報告書.xlsx")

# 03 サービス担当者会議記録
def tantousha_kaigi():
    wb, ws = new_sheet("担当者会議記録")
    set_widths(ws, {'A':16,'B':18,'C':18,'D':18,'E':16,'F':14,'G':12})
    r = title_block(ws, "サービス担当者会議 記録", "計画案について本人・家族・サービス事業者等で検討。専門的見地からの意見を計画に反映", "G")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("開催日時 / 場所", ""), ("利用者氏名", ""),
        ("開催回数 / 目的", "□新規　□更新　□区分変更　□状況変化"),
        ("主催（相談支援専門員）", ""),
    ], last_col="G")
    r = blank(ws, r)
    r = section(ws, r, "出席者", "G")
    r = table_header(ws, r, ["所属・事業所","職種","氏名","欠席時の意見聴取",""," ",""])
    r = table_rows(ws, r, 7, n=6, rowh=20)
    r = blank(ws, r)
    r = section(ws, r, "検討内容・各専門職からの意見", "G")
    r = free_block(ws, r, 4, last_col="G")
    r = blank(ws, r)
    r = section(ws, r, "会議の結論・計画への反映事項", "G")
    r = free_block(ws, r, 3, last_col="G")
    r = label_value_rows(ws, r, [("記録者", "")], last_col="G")
    note(ws, r, "※ 欠席者には事前・事後に意見照会し記録に残す。会議録は計画とともに保管（実地指導で確認）。", last_col="G")
    save(wb, F, "03_サービス担当者会議記録.xlsx")

# 04 アセスメントシート（相談支援版）
def assessment_soudan():
    wb, ws = new_sheet("アセスメント(相談)")
    set_widths(ws, {'A':16,'B':18,'C':18,'D':18,'E':14,'F':12,'G':12,'H':12})
    r = title_block(ws, "アセスメントシート（相談支援）", "本人の状況・環境・意向を多面的に把握し、サービス等利用計画の土台とする", "H")
    r = blank(ws, r)
    r = label_value_rows(ws, r, [
        ("氏名 / 生年月日", ""), ("実施日 / 実施者", ""),
        ("障害種別 / 支援区分", ""), ("情報源", "□本人　□家族　□関係機関"),
    ], last_col="H")
    r = blank(ws, r)
    for sec in [
        "1. 生活歴・現在の暮らし（住まい・日中活動）",
        "2. 健康・医療（疾患・服薬・通院）",
        "3. 日常生活動作（ADL/IADL）",
        "4. コミュニケーション・対人・社会参加",
        "5. 家族・インフォーマルな支え・経済",
        "6. 本人の希望する生活・強み・課題整理",
    ]:
        r = section(ws, r, sec)
        r = free_block(ws, r, 2)
    note(ws, r, "※ ICF（生活機能）の視点で「心身機能・活動・参加・環境因子・個人因子」を整理。本人中心で。")
    save(wb, F, "04_アセスメントシート（相談支援版）.xlsx")

def main():
    print(f"=== {F} 生成 ===")
    riyou_keikaku(); monitoring(); tantousha_kaigi(); assessment_soudan()
    print("=== 完了 ===")

if __name__ == "__main__":
    main()

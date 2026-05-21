"""
Google Sheets ヘルパー
gspread + サービスアカウント認証
"""
import os, json
import gspread
from google.oauth2.service_account import Credentials

SCOPES = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive",
]

def get_client():
    """環境変数からサービスアカウント認証でgspreadクライアントを返す"""
    creds_json = os.environ.get("GOOGLE_CREDENTIALS_JSON")
    if not creds_json:
        raise RuntimeError("GOOGLE_CREDENTIALS_JSON が設定されていません")
    info = json.loads(creds_json)
    creds = Credentials.from_service_account_info(info, scopes=SCOPES)
    return gspread.authorize(creds)

def get_sheet(spreadsheet_id: str, tab_name: str):
    client = get_client()
    try:
        wb = client.open_by_key(spreadsheet_id)
    except Exception as e:
        raise RuntimeError(f"スプレッドシートを開けません: {e}")
    try:
        return wb.worksheet(tab_name)
    except gspread.WorksheetNotFound:
        # シートが存在しない場合は新規作成
        return wb.add_worksheet(title=tab_name, rows=200, cols=20)

def read_all(spreadsheet_id: str, tab_name: str) -> list[dict]:
    """シートの全データを辞書のリストで返す（1行目がヘッダー）"""
    ws = get_sheet(spreadsheet_id, tab_name)
    return ws.get_all_records()

def append_row(spreadsheet_id: str, tab_name: str, row: list):
    """末尾に1行追加"""
    ws = get_sheet(spreadsheet_id, tab_name)
    ws.append_row(row, value_input_option="USER_ENTERED")

def update_row(spreadsheet_id: str, tab_name: str,
               key_col: str, key_val: str, updates: dict):
    """key_col の値が key_val に一致する行を updates で更新"""
    ws    = get_sheet(spreadsheet_id, tab_name)
    data  = ws.get_all_records()
    headers = ws.row_values(1)

    for i, row in enumerate(data, start=2):   # 2行目からデータ
        if str(row.get(key_col, "")) == str(key_val):
            for col_name, val in updates.items():
                if col_name in headers:
                    col_idx = headers.index(col_name) + 1
                    ws.update_cell(i, col_idx, val)
            return True
    return False   # 該当行なし

def ensure_headers(spreadsheet_id: str, tab_name: str, headers: list):
    """シートの1行目にヘッダーがなければ書き込む"""
    ws = get_sheet(spreadsheet_id, tab_name)
    existing = ws.row_values(1)
    if not existing:
        ws.update("A1", [headers])

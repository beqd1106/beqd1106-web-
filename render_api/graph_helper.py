"""
グラフ生成ヘルパー（matplotlib + japanize）
全グラフをメモリ上でPNG生成してBytesIOで返す
"""
import io
import matplotlib
matplotlib.use("Agg")   # GUIなしで動作させる
import matplotlib.pyplot as plt
import matplotlib.ticker as mticker
import japanize_matplotlib   # 日本語フォント自動設定
import pandas as pd

# ── 共通スタイル ──────────────────────────────────────────
CORAL      = "#F0956A"
CORAL_DARK = "#D4784C"
MINT       = "#7DC49A"
SKY        = "#5BA3D4"
LAVENDER   = "#9B7FD4"
CREAM      = "#FEF6E0"
TEXT_DARK  = "#2A2020"
GRID_COLOR = "#EDE0D4"

def _base_fig(title: str, figsize=(10, 5)):
    fig, ax = plt.subplots(figsize=figsize)
    fig.patch.set_facecolor(CREAM)
    ax.set_facecolor("#FFFFFF")
    ax.set_title(title, fontsize=14, fontweight="bold",
                 color=TEXT_DARK, pad=14)
    ax.tick_params(colors=TEXT_DARK, labelsize=10)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(GRID_COLOR)
    ax.spines["bottom"].set_color(GRID_COLOR)
    ax.yaxis.grid(True, color=GRID_COLOR, linewidth=0.8)
    ax.set_axisbelow(True)
    return fig, ax

def _to_png(fig) -> io.BytesIO:
    buf = io.BytesIO()
    fig.tight_layout()
    fig.savefig(buf, format="png", dpi=130,
                bbox_inches="tight", facecolor=fig.get_facecolor())
    plt.close(fig)
    buf.seek(0)
    return buf

# ================================================================
# ① 工賃推移グラフ（折れ線）
# ================================================================
def chart_wage(records: list[dict]) -> io.BytesIO:
    """
    records = [{"月": "2025/04", "平均工賃": 12500, "目標": 16000}, ...]
    """
    df = pd.DataFrame(records)
    fig, ax = _base_fig("月額平均工賃の推移（円）")

    ax.plot(df["月"], df["平均工賃"], marker="o", linewidth=2.5,
            color=CORAL, label="実績工賃", markersize=7)
    if "目標" in df.columns:
        ax.plot(df["月"], df["目標"], linestyle="--", linewidth=1.8,
                color=CORAL_DARK, label="目標工賃", markersize=0)

    ax.yaxis.set_major_formatter(mticker.FuncFormatter(
        lambda x, _: f"¥{int(x):,}"))
    ax.set_xlabel("月", fontsize=11, color=TEXT_DARK)
    ax.set_ylabel("工賃（円）", fontsize=11, color=TEXT_DARK)
    ax.legend(fontsize=10)
    plt.xticks(rotation=35, ha="right")
    return _to_png(fig)

# ================================================================
# ② 稼働率推移グラフ（棒グラフ）
# ================================================================
def chart_utilization(records: list[dict]) -> io.BytesIO:
    """
    records = [{"月": "2025/04", "稼働率": 78.5, "利用者数": 12}, ...]
    """
    df = pd.DataFrame(records)
    fig, ax1 = plt.subplots(figsize=(10, 5))
    fig.patch.set_facecolor(CREAM)
    ax1.set_facecolor("#FFFFFF")
    ax1.set_title("月別稼働率・利用者数", fontsize=14, fontweight="bold",
                  color=TEXT_DARK, pad=14)

    x = range(len(df))
    bars = ax1.bar(x, df["稼働率"], color=SKY, alpha=0.75, label="稼働率（%）")
    ax1.set_ylim(0, 120)
    ax1.set_ylabel("稼働率（%）", color=SKY, fontsize=11)
    ax1.set_xticks(x); ax1.set_xticklabels(df["月"], rotation=35, ha="right")
    ax1.axhline(y=100, color="red", linewidth=0.8, linestyle="--", alpha=0.5)
    ax1.yaxis.grid(True, color=GRID_COLOR, linewidth=0.8); ax1.set_axisbelow(True)

    # バーの上に数値表示
    for bar, val in zip(bars, df["稼働率"]):
        ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1.5,
                 f"{val:.1f}%", ha="center", va="bottom", fontsize=8.5,
                 color=TEXT_DARK)

    # 右軸に利用者数
    if "利用者数" in df.columns:
        ax2 = ax1.twinx()
        ax2.plot(x, df["利用者数"], marker="D", linewidth=2,
                 color=CORAL, label="実利用者数（名）", markersize=6)
        ax2.set_ylabel("利用者数（名）", color=CORAL, fontsize=11)
        ax2.spines["top"].set_visible(False)

    for spine in ["top", "right", "left", "bottom"]:
        ax1.spines[spine].set_color(GRID_COLOR)

    lines1, labels1 = ax1.get_legend_handles_labels()
    if "利用者数" in df.columns:
        lines2, labels2 = ax2.get_legend_handles_labels()
        ax1.legend(lines1 + lines2, labels1 + labels2, fontsize=10, loc="upper left")
    else:
        ax1.legend(fontsize=10)

    return _to_png(fig)

# ================================================================
# ③ 加算取得状況（横棒グラフ）
# ================================================================
def chart_additions(records: list[dict]) -> io.BytesIO:
    """
    records = [{"加算名": "処遇改善加算Ⅰ", "単価": 13.7, "取得": True}, ...]
    """
    df = pd.DataFrame(records)
    df_sorted = df.sort_values("単価", ascending=True)

    fig, ax = _base_fig("加算取得状況と単価（%または単位/日）",
                        figsize=(10, max(4, len(df) * 0.55)))

    colors = [MINT if row["取得"] else "#DDDDDD"
              for _, row in df_sorted.iterrows()]
    bars = ax.barh(df_sorted["加算名"], df_sorted["単価"],
                   color=colors, height=0.6)

    # 値ラベル
    for bar, row in zip(bars, df_sorted.itertuples()):
        label = f"{row.単価}{'%' if row.単価 < 30 else '単位'}  {'✅取得中' if row.取得 else '❌未取得'}"
        ax.text(bar.get_width() + 0.3, bar.get_y() + bar.get_height()/2,
                label, va="center", fontsize=8.5, color=TEXT_DARK)

    ax.set_xlabel("単価（%または単位/日）", fontsize=11, color=TEXT_DARK)
    ax.set_xlim(0, df["単価"].max() * 1.6)
    ax.xaxis.grid(True, color=GRID_COLOR, linewidth=0.8)
    ax.set_axisbelow(True)
    return _to_png(fig)

# ================================================================
# ④ 収益シミュレーション（積み上げ棒）
# ================================================================
def chart_revenue(records: list[dict]) -> io.BytesIO:
    """
    records = [{"月": "2025/04", "基本報酬": 800000, "加算合計": 150000, "目標": 1000000}, ...]
    """
    df = pd.DataFrame(records)
    fig, ax = _base_fig("月別収益シミュレーション（円）", figsize=(11, 5))

    x = range(len(df))
    ax.bar(x, df["基本報酬"], color=SKY,     alpha=0.85, label="基本報酬")
    ax.bar(x, df["加算合計"], color=CORAL,   alpha=0.85, label="加算合計",
           bottom=df["基本報酬"])
    if "目標" in df.columns:
        ax.plot(x, df["目標"], "D--", color=CORAL_DARK,
                linewidth=1.8, markersize=6, label="目標収益")

    ax.yaxis.set_major_formatter(mticker.FuncFormatter(
        lambda v, _: f"¥{int(v/10000)}万"))
    ax.set_xticks(x); ax.set_xticklabels(df["月"], rotation=35, ha="right")
    ax.set_ylabel("収益（円）", fontsize=11, color=TEXT_DARK)
    ax.legend(fontsize=10)
    return _to_png(fig)

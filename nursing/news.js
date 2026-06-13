/**
 * 更新情報の管理ファイル
 * ====================================================
 * 情報を更新したら、この配列の「先頭」に新しいエントリを追加してください。
 * date: "YYYY-MM-DD" 形式で記入
 * labels: 関係するラベルを配列で指定（複数可）
 *   使えるラベル: "訪問看護" / "就労A型" / "就労B型" / "相談支援"
 *                 "請求・加算" / "書類" / "監査・法令" / "京都府" / "全体"
 * href: クリックしたときに遷移するページ
 * ====================================================
 */
var GUIDE_NEWS = [
  {
    date: "2026-06-12",
    title: "ファクトチェック実施：特別管理加算（5,000円/2,500円）・基本療養費（5,550円）を訂正、24時間対応体制加算のイ/ロ2区分を明記、医療保険の誤った処遇改善加算記載をベースアップ評価料に修正",
    labels: ["訪問看護", "請求・加算"],
    href: "05_請求業務.html"
  },
  {
    date: "2026-06-01",
    title: "令和8年度診療報酬改定が施行（2026年6月1日）：包括型訪問看護療養費・医療情報連携加算（1,000円/月）・遠隔診療補助料（2,650円/日）新設、ベースアップ評価料(Ⅰ)1,050円へ引き上げ、乳幼児加算1,400円へ",
    labels: ["訪問看護", "請求・加算", "監査・法令"],
    href: "05_請求業務.html"
  },
  {
    date: "2026-05-21",
    title: "AI作成支援：コンテンツ一覧カード追加・ナビデザイン統一・ヒーローボタン整理",
    labels: ["全体"],
    href: "14_AI作成支援.html"
  },
  {
    date: "2026-05-21",
    title: "全ページレスポンシブ強化：AI支援ページのモバイル表示・タブ2列グリッド・出力ボックスの改行を修正",
    labels: ["全体"],
    href: "14_AI作成支援.html"
  },
  {
    date: "2026-05-20",
    title: "AI作成支援ページ新規追加：個別支援計画・アセスメント等5種の書類生成 + 加算診断・法令Q&A等7種のAIツール（Cloudflare Workers AI・無料）",
    labels: ["全体", "書類", "請求・加算"],
    href: "14_AI作成支援.html"
  },
  {
    date: "2026-05-20",
    title: "AI生成書類をExcel形式でダウンロード可能に：書類タイプ別テンプレート構造（アセスメントICF4列・看護記録バイタル表等）で出力",
    labels: ["書類", "訪問看護"],
    href: "14_AI作成支援.html"
  },
  {
    date: "2026-05-17",
    title: "全ページ大幅強化：詳細ポップアップ・収益シミュレーション・出典明記を追加",
    labels: ["全体"],
    href: "index.html"
  },
  {
    date: "2026-05-17",
    title: "請求業務：訪問看護療養費 加算13種類の算定要件・体制届要否を網羅（2024年6月改定対応）",
    labels: ["訪問看護", "請求・加算"],
    href: "05_請求業務.html"
  },
  {
    date: "2026-05-17",
    title: "就労継続支援A型：就労移行支援体制加算の単位段階表・最低賃金計算例を追記",
    labels: ["就労A型", "請求・加算"],
    href: "06_就労継続A型.html"
  },
  {
    date: "2026-05-17",
    title: "就労継続支援B型：目標工賃達成加算の収益試算・工賃向上計画の作成方法を追記",
    labels: ["就労B型", "請求・加算"],
    href: "07_就労継続B型.html"
  },
  {
    date: "2026-05-17",
    title: "必要書類：推奨書類（BCP・ハラスメント防止方針・業務マニュアル等）セクション新設",
    labels: ["書類", "訪問看護"],
    href: "02_必要書類.html"
  },
  {
    date: "2024-10-01",
    title: "就労選択支援が新設（障害者総合支援法改正）：A型・B型新規利用前のアセスメントが必要に",
    labels: ["就労A型", "就労B型", "監査・法令"],
    href: "01_法令・制度.html"
  },
  {
    date: "2024-06-01",
    title: "診療報酬改定（2024年6月施行）：訪問看護基本療養費・加算額が改定",
    labels: ["訪問看護", "請求・加算"],
    href: "05_請求業務.html"
  },
  {
    date: "2024-04-01",
    title: "障害者差別解消法改正：事業者の合理的配慮の提供が義務化（努力義務→義務）",
    labels: ["監査・法令", "全体"],
    href: "01_法令・制度.html"
  },
  {
    date: "2024-04-01",
    title: "BCP（事業継続計画）の策定義務化（経過措置終了）：全障害福祉サービス事業所対象",
    labels: ["書類", "監査・法令"],
    href: "03_管理業務.html"
  }
];

// ====================================================
// 以下は自動表示ロジック（編集不要）
// ====================================================
(function () {
  var container = document.getElementById('news-container');
  if (!container || !GUIDE_NEWS || GUIDE_NEWS.length === 0) return;

  var now = new Date();
  var LABEL_COLORS = {
    '訪問看護':  { bg: '#F2E7E0', color: '#A86848', border: '#D8C0AE' },
    '就労A型':  { bg: '#E8F0FF', color: '#3858C8', border: '#A8C4F0' },
    '就労B型':  { bg: '#E8F5E9', color: '#2E7D32', border: '#A5D6A7' },
    '相談支援': { bg: '#F3E8FF', color: '#7B1FA2', border: '#CE93D8' },
    '請求・加算':{ bg: '#FFF8E1', color: '#F57F17', border: '#FFE082' },
    '書類':     { bg: '#E8FBFF', color: '#006064', border: '#80DEEA' },
    '監査・法令':{ bg: '#FBE8E8', color: '#B71C1C', border: '#EF9A9A' },
    '京都府':   { bg: '#FFF3E0', color: '#E65100', border: '#FFCC80' },
    '全体':     { bg: '#F5F5F5', color: '#424242', border: '#BDBDBD' }
  };

  var html = '';
  GUIDE_NEWS.forEach(function (item) {
    var itemDate = new Date(item.date);
    var diffDays = Math.floor((now - itemDate) / (1000 * 60 * 60 * 24));
    var isNew = diffDays <= 30;

    var labelsHtml = (item.labels || []).map(function (label) {
      var c = LABEL_COLORS[label] || LABEL_COLORS['全体'];
      return '<span style="display:inline-block;font-size:0.7rem;font-weight:700;padding:0.1rem 0.5rem;border-radius:99px;background:' + c.bg + ';color:' + c.color + ';border:1px solid ' + c.border + ';margin-right:0.3rem;">' + label + '</span>';
    }).join('');

    var dateStr = item.date.replace(/-/g, '/');
    var newBadge = isNew
      ? '<span style="display:inline-block;background:#E53935;color:white;font-size:0.65rem;font-weight:800;padding:0.1rem 0.45rem;border-radius:99px;margin-right:0.4rem;vertical-align:middle;letter-spacing:0.03em;">NEW!</span>'
      : '';

    html += '<a href="' + (item.href || '#') + '" style="display:block;text-decoration:none;padding:0.7rem 1rem;border-bottom:1px solid #f0e8e0;transition:background 0.15s;" onmouseover="this.style.background=\'#FFF8F4\'" onmouseout="this.style.background=\'\'">'
      + '<div style="display:flex;align-items:flex-start;gap:0.6rem;flex-wrap:wrap;">'
      + '<span style="flex-shrink:0;font-size:0.75rem;color:#999;white-space:nowrap;padding-top:0.1rem;">' + dateStr + '</span>'
      + '<span style="flex:1;min-width:0;">'
      + newBadge
      + labelsHtml
      + '<span style="font-size:0.84rem;color:#444;line-height:1.5;">' + item.title + '</span>'
      + '</span>'
      + '</div>'
      + '</a>';
  });

  container.innerHTML = html || '<p style="padding:1rem;color:#999;font-size:0.85rem;">更新情報はありません。</p>';
})();

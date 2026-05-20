/* ================================================================
   障碍者福祉 運営ガイド — 締切アラートシステム
   年間の重要締切を定義し、TOPページと全ページにバナーを表示する
================================================================ */
(function () {
  'use strict';

  // ── 年間固定締切（毎年繰り返す） ───────────────────────────────
  // level: 'danger'(赤・締切)  'warning'(橙・届出)  'info'(青・定例)
  var ANNUAL = [
    { month: 4,  day: 5,  label: '就労移行・目標工賃加算 体制届（4月上旬）',    level: 'warning', link: '04_京都府・手続き.html',  detail: '国保連への就労移行支援体制加算・目標工賃達成加算の体制届提出（4月上旬・前月末までに提出推奨）。' },
    { month: 4,  day: 5,  label: '工賃向上計画 提出（B型・4月上旬）',           level: 'warning', link: '07_就労継続B型.html',     detail: 'B型事業所の工賃向上計画を京都府（障害者支援課）・京都市（障害保健福祉推進室）へ提出（4月上旬）。' },
    { month: 4,  day: 15, label: '処遇改善加算 計画書 提出期限',                level: 'danger',  link: '04_京都府・手続き.html',  detail: '処遇改善加算計画書（別紙様式2）を京都府・京都市へ提出。期限：毎年4月15日。提出先：管轄保健所。' },
    { month: 7,  day: 31, label: '処遇改善加算 実績報告書 提出期限',            level: 'danger',  link: '04_京都府・手続き.html',  detail: '前年度（4月〜3月）の処遇改善加算実績報告書（別紙様式3）を7月31日までに提出。' },
    { month: 10, day: 1,  label: '最低賃金改定確認（A型）— 例年10月改定',       level: 'warning', link: '06_就労継続A型.html',    detail: '毎年10月に都道府県最低賃金が改定されます。A型は全利用者の時給を確認・改定する義務があります。' },
    { month: 12, day: 28, label: '年末年始の訪問体制・緊急連絡先の確認',         level: 'info',    link: '03_管理業務.html',      detail: '年末年始（12/29〜1/3）の訪問スケジュール・緊急連絡先を利用者・家族に案内。' },
    { month: 3,  day: 31, label: '年度末：個別支援計画・指定更新の最終確認',      level: 'info',    link: '09_監査対応.html',      detail: '年度末に個別支援計画書・訪問看護指示書の有効期限・指定更新の期限を確認してください。' },
  ];

  // ── 毎月の定例締切 ─────────────────────────────────────────────
  var MONTHLY = [
    { day: 10, label: '国保連・支払基金 レセプト提出期限（当月10日）', level: 'danger', link: '05_請求業務.html', detail: '当月分（前月サービス分）の診療報酬・障害福祉サービス費の請求データを提出。遅延すると入金が1ヶ月遅れます。' },
    { day: 1,  label: 'カンファレンス・月次業務開始確認',              level: 'info',   link: '03_管理業務.html', detail: '月初に訪問看護計画書・実績記録・勤務表の確認を行い、月次業務をスタートする。' },
  ];

  // ── 日付計算ユーティリティ ───────────────────────────────────────
  function today() { return new Date(); }

  function daysUntil(targetDate) {
    var t = new Date(targetDate);
    t.setHours(0, 0, 0, 0);
    var now = new Date(); now.setHours(0, 0, 0, 0);
    return Math.round((t - now) / 86400000);
  }

  // ── 今後N日以内の締切を取得 ──────────────────────────────────────
  function getUpcoming(withinDays) {
    var now = today();
    var year = now.getFullYear();
    var results = [];

    // 年間固定締切（今年・来年分を両方チェック）
    ANNUAL.forEach(function (d) {
      [0, 1].forEach(function (offset) {
        var dt = new Date(year + offset, d.month - 1, d.day);
        var diff = daysUntil(dt);
        if (diff >= 0 && diff <= withinDays) {
          results.push({ date: dt, diff: diff, label: d.label, level: d.level, link: d.link, detail: d.detail });
        }
      });
    });

    // 毎月の定例締切（今月・来月分）
    var m = now.getMonth();
    var y = now.getFullYear();
    MONTHLY.forEach(function (d) {
      [new Date(y, m, d.day), new Date(y, m + 1, d.day)].forEach(function (dt) {
        var diff = daysUntil(dt);
        if (diff >= 0 && diff <= withinDays) {
          results.push({ date: dt, diff: diff, label: d.label, level: d.level, link: d.link, detail: d.detail });
        }
      });
    });

    // 日付順にソート
    results.sort(function (a, b) { return a.diff - b.diff; });
    // 重複除去（同じlabelが2回入らないように）
    var seen = {};
    return results.filter(function (r) {
      if (seen[r.label]) return false;
      seen[r.label] = true; return true;
    });
  }

  // ── バッジ色 ──────────────────────────────────────────────────────
  function urgencyClass(diff) {
    if (diff <= 3)  return 'dl-urgent';
    if (diff <= 7)  return 'dl-soon';
    if (diff <= 14) return 'dl-near';
    return 'dl-far';
  }
  function levelLabel(level) {
    return { danger: '締切', warning: '届出', info: '定例' }[level] || level;
  }
  function diffLabel(diff) {
    if (diff === 0) return '今日！';
    if (diff === 1) return '明日！';
    return diff + '日後';
  }

  // ── TOPページ専用ウィジェット ─────────────────────────────────────
  function renderTopWidget() {
    var el = document.getElementById('deadline-widget');
    if (!el) return;

    var items = getUpcoming(10);
    if (items.length === 0) {
      el.innerHTML = '<div class="dl-widget-empty">今後10日以内に迫った締切はありません ✅</div>';
      return;
    }

    el.innerHTML = items.map(function (item) {
      var lnk = item.link;
      var badge = '<span class="dl-badge dl-badge-' + item.level + '">' + levelLabel(item.level) + '</span>';
      var days  = '<span class="dl-days ' + urgencyClass(item.diff) + '">' + diffLabel(item.diff) + '</span>';
      var dateStr = (item.date.getMonth() + 1) + '/' + item.date.getDate();
      return '<a class="dl-item" href="' + lnk + '">' +
        '<div class="dl-item-left">' + badge + '<span class="dl-label">' + item.label + '</span></div>' +
        '<div class="dl-item-right"><span class="dl-date">' + dateStr + '</span>' + days + '</div>' +
        '</a>';
    }).join('');
  }

  // ── 全ページ：ヘッダー下のミニバナー ─────────────────────────────
  function renderTopBanner() {
    var items = getUpcoming(7); // 7日以内のみ
    if (items.length === 0) return;
    var banner = document.createElement('div');
    banner.id = 'dl-banner';
    banner.className = 'dl-banner';
    var html = '<span class="dl-banner-icon">⏰</span><div class="dl-banner-items">';
    items.slice(0, 3).forEach(function (item) {
      html += '<a class="dl-banner-item dl-banner-' + item.level + '" href="' + item.link + '" title="' + item.detail + '">' +
        diffLabel(item.diff) + '：' + item.label + '</a>';
    });
    html += '</div><button class="dl-banner-close" onclick="this.parentElement.remove()" aria-label="閉じる">✕</button>';
    banner.innerHTML = html;
    var header = document.querySelector('.site-header');
    if (header) header.insertAdjacentElement('afterend', banner);
  }

  // ── 初期化 ───────────────────────────────────────────────────────
  function init() {
    renderTopWidget();
    renderTopBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

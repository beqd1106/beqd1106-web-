/* ================================================================
   nav.js v2 — グループ型グローバルナビゲーション
   既存 <header class="site-header"> の中身を置き換えて
   5グループのドロップダウン + モバイルドロワーを構築する
================================================================ */
(function () {
  'use strict';

  var PATH = decodeURIComponent(location.pathname);
  var IS_SUBDIR = PATH.indexOf('/フォーマット/') !== -1 || PATH.indexOf('/format/') !== -1;
  var B = IS_SUBDIR ? '../' : '';
  var CURRENT = PATH.split('/').pop() || 'index.html';

  /* Tabler系ストロークアイコン */
  function icon(d) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }
  var IC = {
    base:    icon('<path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1M9 13h1m4 0h1M10 21v-4h4v4"/>'),
    service: icon('<path d="M19.5 12.6 12 20l-7.5-7.4a5 5 0 1 1 7.5-6.6 5 5 0 1 1 7.5 6.6z"/>'),
    money:   icon('<circle cx="12" cy="12" r="9"/><path d="m9 8 3 4 3-4m-3 4v5m-3-3h6m-6-2.5h6"/>'),
    audit:   icon('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5M8 10.5h5m-5-2.5h5"/>'),
    support: icon('<path d="M12 3v3m0 12v3m9-9h-3M6 12H3m13.5-6.5L15 7m-6 6-1.5 1.5m9 0L15 13m-6-6L7.5 5.5"/><circle cx="12" cy="12" r="3"/>'),
    search:  icon('<circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/>'),
    chevron: icon('<path d="m6 9 6 6 6-6"/>'),
    burger:  icon('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    close:   icon('<path d="M6 6l12 12M18 6 6 18"/>'),
    logo:    icon('<path d="M12 4v16m-8-8h16"/><circle cx="12" cy="12" r="9.5"/>')
  };

  var GROUPS = [
    {
      label: '運営の基礎', icon: IC.base,
      links: [
        { href: '01_法令・制度.html',   title: '法令・制度',     desc: '医療・福祉系法令と遵守チェック' },
        { href: '02_必要書類.html',     title: '必要書類',       desc: '指定申請・記録書類・保管期間' },
        { href: '03_管理業務.html',     title: '管理業務',       desc: '業務サイクル・BCP・感染対策' },
        { href: '04_京都府・手続き.html', title: '京都府・手続き', desc: '指定申請・届出・窓口一覧' }
      ]
    },
    {
      label: 'サービス別', icon: IC.service,
      links: [
        { href: '13_障害介護サービス.html', title: '障害介護サービス', desc: '居宅介護・重訪・同行・行動援護' },
        { href: '06_就労継続A型.html',     title: '就労継続A型',     desc: '雇用契約・賃金・生産活動収支' },
        { href: '07_就労継続B型.html',     title: '就労継続B型',     desc: '工賃管理・目標工賃達成加算' },
        { href: '08_相談支援.html',        title: '相談支援',        desc: '計画相談・地域移行・地域定着' }
      ]
    },
    {
      label: '請求・経営', icon: IC.money,
      links: [
        { href: '05_請求業務.html',        title: '請求業務',         desc: '加算一覧・返戻対応・収益試算' },
        { href: '10_収入向上.html',        title: '収入向上',         desc: '加算・利用者増・稼働率の3軸' },
        { href: '11_年間スケジュール.html', title: '年間スケジュール', desc: '締切・届出の月別カレンダー' },
        { href: '15_データ管理.html',      title: 'データ管理',       desc: '利用者・工賃・稼働率の記録' }
      ]
    },
    {
      label: '監査・指導', icon: IC.audit,
      links: [
        { href: '09_監査対応.html',            title: '監査対応',             desc: '指摘事項と対応策・不正防止' },
        { href: '16_実地指導チェックリスト.html', title: '実地指導チェックリスト', desc: '75項目セルフチェック' }
      ]
    },
    {
      label: 'サポート', icon: IC.support,
      links: [
        { href: '14_AI作成支援.html',      title: 'AI作成支援',       desc: '書類12種をAIが自動下書き' },
        { href: 'フォーマット/index.html', title: '様式ダウンロード', desc: '公式・オリジナル様式56種' },
        { href: '12_QA.html',             title: 'Q&A',             desc: 'よくある質問と回答' }
      ]
    }
  ];

  function isCurrent(href) {
    return href.split('/').pop() === CURRENT &&
      (href.indexOf('フォーマット/') === -1) === !IS_SUBDIR;
  }

  function buildPanel(group) {
    var html = '<div class="gnav-panel" role="menu">';
    group.links.forEach(function (l) {
      html += '<a role="menuitem" href="' + B + l.href + '"' +
        (isCurrent(l.href) ? ' class="current"' : '') + '>' +
        '<span class="gp-title">' + l.title + '</span>' +
        '<span class="gp-desc">' + l.desc + '</span></a>';
    });
    return html + '</div>';
  }

  function build() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    var html =
      '<a href="' + B + 'index.html" class="site-logo">' + IC.logo +
        '<span class="logo-text">障碍者福祉<em>運営ガイド</em></span></a>' +
      '<nav class="gnav" aria-label="メインナビゲーション">' +
        '<a class="gnav-top' + (CURRENT === 'index.html' && !IS_SUBDIR ? ' active' : '') + '" href="' + B + 'index.html">TOP</a>';

    GROUPS.forEach(function (g, i) {
      var hasCurrent = g.links.some(function (l) { return isCurrent(l.href); });
      html += '<div class="gnav-item' + (hasCurrent ? ' has-current' : '') + '">' +
        '<button type="button" class="gnav-btn" aria-expanded="false" aria-haspopup="true" data-i="' + i + '">' +
        g.icon + '<span>' + g.label + '</span>' + IC.chevron + '</button>' +
        buildPanel(g) + '</div>';
    });

    html += '</nav>' +
      '<div class="gnav-actions">' +
        '<button type="button" class="gnav-search" aria-label="サイト内検索">' + IC.search +
          '<span>検索</span><kbd>Ctrl+K</kbd></button>' +
        '<button type="button" class="gnav-burger" aria-label="メニューを開く" aria-expanded="false">' + IC.burger + '</button>' +
      '</div>';

    header.innerHTML = html;

    /* ── モバイルドロワー ── */
    var drawer = document.createElement('div');
    drawer.className = 'gnav-drawer';
    var dHtml = '<div class="gd-inner"><a class="gd-top" href="' + B + 'index.html">TOP — ホーム</a>';
    GROUPS.forEach(function (g) {
      dHtml += '<div class="gd-group"><div class="gd-label">' + g.icon + g.label + '</div>';
      g.links.forEach(function (l) {
        dHtml += '<a href="' + B + l.href + '"' + (isCurrent(l.href) ? ' class="current"' : '') + '>' + l.title + '</a>';
      });
      dHtml += '</div>';
    });
    dHtml += '<button type="button" class="gd-search">' + IC.search + ' サイト内検索</button></div>';
    drawer.innerHTML = dHtml;
    /* header は backdrop-filter で fixed の基準になるため body 直下に置く */
    document.body.appendChild(drawer);

    /* ── ドロップダウン開閉（クリック）── */
    var items = header.querySelectorAll('.gnav-item');
    function closeAll(except) {
      items.forEach(function (it) {
        if (it !== except) {
          it.classList.remove('open');
          it.querySelector('.gnav-btn').setAttribute('aria-expanded', 'false');
        }
      });
    }
    items.forEach(function (it) {
      var btn = it.querySelector('.gnav-btn');
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = it.classList.toggle('open');
        btn.setAttribute('aria-expanded', open);
        closeAll(it);
      });
    });
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) closeAll(null);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeAll(null); toggleDrawer(false); }
    });

    /* ── 検索 ── */
    function openSearchSafe() {
      toggleDrawer(false);
      if (typeof window.openSearch === 'function') window.openSearch();
    }
    header.querySelector('.gnav-search').addEventListener('click', openSearchSafe);
    drawer.querySelector('.gd-search').addEventListener('click', openSearchSafe);

    /* ── ドロワー開閉 ── */
    var burger = header.querySelector('.gnav-burger');
    function toggleDrawer(force) {
      var open = typeof force === 'boolean' ? force : !drawer.classList.contains('open');
      drawer.classList.toggle('open', open);
      document.body.classList.toggle('drawer-open', open);
      burger.innerHTML = open ? IC.close : IC.burger;
      burger.setAttribute('aria-expanded', open);
      burger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    }
    burger.addEventListener('click', function () { toggleDrawer(); });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { toggleDrawer(false); });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();

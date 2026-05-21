/* ================================================================
   スクロールアニメーション
   sankoudesign.com 参考：IntersectionObserver でフェードイン
================================================================ */
(function () {
  'use strict';

  // ── スクロールフェードイン ───────────────────────────────────
  function initFadeIn() {
    // .card, .nav-card, .alert, .section-label に自動付与
    var targets = document.querySelectorAll(
      '.card, .nav-card, .alert, .section-label, .page-hero .hero-text, .dl-item'
    );

    targets.forEach(function (el, i) {
      el.classList.add('fade-in');
      // グリッド内のカードは連続遅延
      var parent = el.parentElement;
      if (parent && (parent.classList.contains('nav-grid') || parent.classList.contains('chart-grid'))) {
        var siblings = Array.from(parent.children);
        var idx = siblings.indexOf(el) % 4;
        if (idx > 0) el.dataset.delay = idx;
      }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    });

    targets.forEach(function (el) { observer.observe(el); });
  }

  // ── ナビリンク カーソルエフェクト ─────────────────────────────
  function initNavHover() {
    var links = document.querySelectorAll('.site-nav a');
    links.forEach(function (a) {
      a.addEventListener('mouseenter', function () {
        a.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
    });
  }

  // ── ページ読み込み時のフェード ────────────────────────────────
  function initPageFade() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.4s ease';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.style.opacity = '1';
      });
    });
  }

  // ── ヒーロー テキストアニメーション ─────────────────────────
  function initHeroAnimation() {
    var heroText = document.querySelector('.page-hero .hero-text');
    if (!heroText) return;
    heroText.style.opacity = '0';
    heroText.style.transform = 'translateY(16px)';
    heroText.style.transition = 'opacity 0.7s cubic-bezier(0.21, 0.51, 0.51, 1), transform 0.7s cubic-bezier(0.21, 0.51, 0.51, 1)';
    setTimeout(function () {
      heroText.style.opacity = '1';
      heroText.style.transform = 'translateY(0)';
    }, 120);
  }

  // ── カード マウスムーブ 3D チルト（軽め）────────────────────
  function initCardTilt() {
    var cards = document.querySelectorAll('.nav-card');
    cards.forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width  - 0.5;
        var y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = 'translateY(-3px) rotateX(' + (-y * 4) + 'deg) rotateY(' + (x * 4) + 'deg)';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s cubic-bezier(0.21, 0.51, 0.51, 1), box-shadow 0.4s, border-color 0.4s';
      });
    });
  }

  // ── ヘッダー スクロール時にサイズ縮小 ────────────────────────
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var lastY = 0;
    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y > 60) {
        header.style.padding = '0.45rem 2rem';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
      } else {
        header.style.padding = '';
        header.style.boxShadow = '';
      }
      lastY = y;
    }, { passive: true });
  }

  // ── 初期化 ────────────────────────────────────────────────────
  function init() {
    initPageFade();
    initHeroAnimation();
    initFadeIn();
    initNavHover();
    initCardTilt();
    initStickyHeader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

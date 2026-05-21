/* ================================================================
   animations.js v2 — sankoudesign.com 参考サイト学習版
   giftee.co.jp / awahi-magazine.jp / shirahone.org のテクニック統合
================================================================ */
(function () {
  'use strict';

  // ── 1. ページフェードイン ─────────────────────────────────────
  function initPageFade() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.45s cubic-bezier(0.21,0.51,0.51,1)';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.body.style.opacity = '1';
      });
    });
  }

  // ── 2. ヒーロー コンテンツアニメーション ─────────────────────
  function initHeroAnimation() {
    var hero = document.querySelector('.page-hero .hero-text');
    if (!hero) return;
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(20px)';
    hero.style.transition = 'opacity 0.8s cubic-bezier(0.21,0.51,0.51,1), transform 0.8s cubic-bezier(0.21,0.51,0.51,1)';
    setTimeout(function () {
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
    }, 100);

    // ヒーローバッジ
    var badge = document.querySelector('.hero-badge');
    if (badge) {
      badge.style.opacity = '0';
      badge.style.transform = 'translateY(8px)';
      badge.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      setTimeout(function () {
        badge.style.opacity = '1';
        badge.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  // ── 3. スクロールフェードイン（Intersection Observer）────────
  function initScrollFade() {
    var targets = document.querySelectorAll(
      '.card, .nav-card, .alert, .stat-item, .img-card, .split-section > *'
    );

    targets.forEach(function (el, i) {
      el.classList.add('fade-in');
      // グリッド内は連続遅延
      var parent = el.parentElement;
      if (parent) {
        var cls = parent.className || '';
        if (cls.includes('nav-grid') || cls.includes('stats-grid') || cls.includes('chart-grid') || cls.includes('split')) {
          var idx = Array.from(parent.children).indexOf(el) % 4;
          if (idx > 0) el.dataset.delay = String(idx);
        }
      }
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -30px 0px',
    });

    targets.forEach(function (el) { observer.observe(el); });
  }

  // ── 4. カード 3D チルト（軽め・giftee方式）──────────────────
  function initCardTilt() {
    if (window.matchMedia('(hover: none)').matches) return; // タッチデバイス除外
    document.querySelectorAll('.nav-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r   = card.getBoundingClientRect();
        var x   = ((e.clientX - r.left) / r.width  - 0.5) * 6;
        var y   = ((e.clientY - r.top)  / r.height - 0.5) * 6;
        card.style.transform   = 'translateY(-4px) rotateX(' + (-y) + 'deg) rotateY(' + x + 'deg)';
        card.style.transition  = 'none';
      });
      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform 0.45s cubic-bezier(0.21,0.51,0.51,1), box-shadow 0.45s, border-color 0.2s';
        card.style.transform  = '';
      });
    });
  }

  // ── 5. スクロール時ヘッダー縮小（awahi方式）──────────────────
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY > 50;
      header.style.padding       = scrolled ? '0.4rem 2rem'    : '';
      header.style.boxShadow     = scrolled ? '0 2px 24px rgba(0,0,0,0.1)' : '';
      header.style.backdropFilter = 'blur(14px) saturate(' + (scrolled ? '1.8' : '1.4') + ')';
    }, { passive: true });
  }

  // ── 6. 統計カウントアップ（スクロールで発火）─────────────────
  function initCountUp() {
    var nums = document.querySelectorAll('.stat-num[data-count]');
    if (!nums.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el  = entry.target;
        var end = parseFloat(el.dataset.count);
        var dur = 1800;
        var start = performance.now();
        var unit  = el.dataset.unit || '';
        observer.unobserve(el);

        function step(now) {
          var t  = Math.min((now - start) / dur, 1);
          // easeOutExpo
          var ease = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          var val  = end * ease;
          el.textContent = (Number.isInteger(end) ? Math.round(val) : val.toFixed(1)) + unit;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });

    nums.forEach(function (el) { observer.observe(el); });
  }

  // ── 7. ナビリンク マイクロインタラクション ────────────────────
  function initNavMicro() {
    document.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('mouseenter', function () {
        a.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });
      a.addEventListener('mouseleave', function () {
        a.style.transition = '';
      });
    });
  }

  // ── 8. セクションラベル 下線アニメーション ───────────────────
  function initSectionLabels() {
    var labels = document.querySelectorAll('.section-label');
    labels.forEach(function (label) {
      label.style.opacity = '0';
    });
    if (!('IntersectionObserver' in window)) {
      labels.forEach(function (l) { l.style.opacity = '1'; });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.transition = 'opacity 0.5s ease';
          e.target.style.opacity = '1';
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    labels.forEach(function (l) { obs.observe(l); });
  }

  // ── 9. ヒーローリング パルスアニメーション ────────────────────
  function initHeroRing() {
    var ring = document.querySelector('.hero-ring');
    if (!ring) return;
    ring.style.animation = 'heroPulse 6s ease-in-out infinite';
    var style = document.createElement('style');
    style.textContent = '@keyframes heroPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.7;transform:scale(0.97)} }';
    document.head.appendChild(style);
  }

  // ── 10. スムーズスクロール ────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ── 初期化 ────────────────────────────────────────────────────
  function init() {
    initPageFade();
    initHeroAnimation();
    initScrollFade();
    initCardTilt();
    initStickyHeader();
    initCountUp();
    initNavMicro();
    initSectionLabels();
    initHeroRing();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

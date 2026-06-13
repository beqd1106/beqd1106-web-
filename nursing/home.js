/* ================================================================
   home.js — TOPページのアニメーション（Lenis + GSAP ScrollTrigger）
   ライブラリはCDNから読み込み済み前提。未ロード時はフォールバック表示。
================================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';
  var hasST   = hasGSAP && typeof window.ScrollTrigger !== 'undefined';

  /* ── 1. 縦書き見出しを1文字ずつ span 化 ───────────────────── */
  function splitChars(el) {
    if (!el) return [];
    var nodes = Array.from(el.childNodes);
    el.innerHTML = '';
    var chars = [];
    nodes.forEach(function (node) {
      if (node.nodeType === 3) { // テキスト
        node.textContent.split('').forEach(function (c) {
          if (c.trim() === '' && c !== '　') { el.appendChild(document.createTextNode(c)); return; }
          var s = document.createElement('span');
          s.className = 'ch';
          s.textContent = c;
          if ('、。」「'.indexOf(c) !== -1) s.classList.add('punct');
          el.appendChild(s);
          chars.push(s);
        });
      } else if (node.nodeName === 'BR') {
        el.appendChild(document.createElement('br'));
      } else if (node.nodeType === 1) {
        // <span class="accent"> 等はそのまま、ただし中身を分割
        var wrap = node.cloneNode(false);
        el.appendChild(wrap);
        node.textContent.split('').forEach(function (c) {
          var s = document.createElement('span');
          s.className = 'ch';
          s.textContent = c;
          wrap.appendChild(s);
          chars.push(s);
        });
      }
    });
    return chars;
  }

  /* ── 2. Lenis スムーズスクロール ──────────────────────────── */
  function initLenis() {
    if (reduced || typeof window.Lenis === 'undefined') return null;
    var lenis = new window.Lenis({
      duration: 1.15,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
    });
    if (hasST) {
      lenis.on('scroll', window.ScrollTrigger.update);
      window.gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
      window.gsap.ticker.lagSmoothing(0);
    } else {
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }
    // 内部アンカーは lenis でスクロール
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -70 }); }
      });
    });
    return lenis;
  }

  /* ── 3. ヒーロー入場 ──────────────────────────────────────── */
  function initHero() {
    var chars = splitChars(document.querySelector('.hm-vtitle'));
    if (!hasGSAP) return;
    var tl = window.gsap.timeline({ defaults: { ease: 'power3.out' } });

    // 写真：クリップワイプ＋わずかにズーム
    tl.from('.hm-hero-figure .hm-photo-mask', { clipPath: 'inset(0 0 100% 0)', duration: 1.1 }, 0)
      .from('.hm-hero-figure img', { scale: 1.18, duration: 1.4 }, 0)
      .from('.hm-hero-figure figcaption', { y: 14, opacity: 0, duration: 0.6 }, 0.7);

    // 縦書き見出し：下から1文字ずつ
    if (chars.length) {
      tl.from(chars, { yPercent: 110, opacity: 0, duration: 0.85, stagger: 0.045 }, 0.25);
    }

    // コピー
    tl.from('.hm-overline', { y: 16, opacity: 0, duration: 0.6 }, 0.5)
      .from('.hm-lead',     { y: 18, opacity: 0, duration: 0.7 }, 0.62)
      .from('.hm-cta > *',  { y: 16, opacity: 0, duration: 0.55, stagger: 0.1 }, 0.75)
      .from('.hm-scroll',   { opacity: 0, duration: 0.6 }, 1);
  }

  /* ── 4. ヒーロー写真パララックス ─────────────────────────── */
  function initParallax() {
    if (!hasST) return;
    window.gsap.to('.hm-hero-figure img', {
      yPercent: 12, ease: 'none',
      scrollTrigger: { trigger: '.hm-hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ── 5. スクロールリビール ────────────────────────────────── */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal]');
    if (!hasST) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    els.forEach(function (el) {
      var delay = parseFloat(el.dataset.reveal) || 0;
      window.gsap.fromTo(el, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, delay: delay, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        onStart: function () { el.classList.add('is-in'); }
      });
    });
  }

  /* ── 6. 統計カウントアップ ────────────────────────────────── */
  function initCounters() {
    document.querySelectorAll('.hm-stat-num[data-count]').forEach(function (el) {
      var end = parseFloat(el.dataset.count);
      var unit = el.dataset.unit || '';
      function run() {
        var start = performance.now(), dur = 1600;
        (function step(now) {
          var t = Math.min((now - start) / dur, 1);
          var e = 1 - Math.pow(2, -10 * t);
          el.firstChild ? (el.childNodes[0].nodeValue = Math.round(end * e))
                        : (el.textContent = Math.round(end * e));
          el.innerHTML = Math.round(end * e) + (unit ? '<span class="u">' + unit + '</span>' : '');
          if (t < 1) requestAnimationFrame(step);
        })(start);
      }
      if (hasST) {
        window.ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: run });
      } else { run(); }
    });
  }

  /* ── 7. ヘッダー：スクロールで背景 ────────────────────────── */
  function initHeader() {
    var h = document.querySelector('.site-header');
    if (!h) return;
    function upd() { h.classList.toggle('scrolled', window.scrollY > 40); }
    window.addEventListener('scroll', upd, { passive: true });
    upd();
  }

  /* ── 8. マグネティックボタン ──────────────────────────────── */
  function initMagnetic() {
    if (reduced || window.matchMedia('(hover: none)').matches || !hasGSAP) return;
    document.querySelectorAll('.hm-btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        window.gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * 0.3,
          y: (e.clientY - r.top - r.height / 2) * 0.4,
          duration: 0.4, ease: 'power3.out'
        });
      });
      btn.addEventListener('mouseleave', function () {
        window.gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
      });
    });
  }

  /* ── 初期化 ───────────────────────────────────────────────── */
  function init() {
    if (hasST) window.gsap.registerPlugin(window.ScrollTrigger);
    initHeader();
    initLenis();
    initHero();
    initParallax();
    initReveal();
    initCounters();
    if (hasST) setTimeout(function () { window.ScrollTrigger.refresh(); }, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }
})();

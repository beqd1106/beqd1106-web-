// =====================================================
// 歯科経営コンパス — Main JS (Lenis + GSAP + UI)
// =====================================================

// ─── Lenis スムーズスクロール ───
const lenis = new Lenis({
  lerp: 0.09,
  wheelMultiplier: 1,
  smoothWheel: true,
  autoRaf: false,
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ─── GSAP セットアップ ───
gsap.registerPlugin(ScrollTrigger);

// ─── カスタムカーソル ───
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1 });
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .tool-card, .info-card, .cat-tab').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('is-hover'); ring.classList.add('is-hover'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('is-hover'); ring.classList.remove('is-hover'); });
});

// ─── ページローダー ───
(function runLoader() {
  const loader = document.getElementById('loader');
  const bar    = document.getElementById('loaderBar');
  const logo   = document.getElementById('loaderLogo');

  gsap.to(logo, { opacity: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' });

  let progress = 0;
  const iv = setInterval(() => {
    progress += Math.random() * 20;
    if (progress >= 100) {
      progress = 100;
      clearInterval(iv);
      bar.style.width = '100%';
      setTimeout(() => {
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => { loader.style.display = 'none'; initAnimations(); }
        });
      }, 300);
    }
    bar.style.width = progress + '%';
  }, 60);
})();

// ─── ヒーローアニメーション（ローダー後） ───
function initAnimations() {
  // SplitType でヒーロータイトルを分割
  if (typeof SplitType !== 'undefined') {
    const splitTitle = new SplitType('#heroTitle', { types: 'lines,words' });
    gsap.from(splitTitle.words, {
      opacity: 0,
      y: 40,
      stagger: 0.04,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.1
    });
  }

  gsap.from('.hero-badge', { opacity: 0, y: -20, duration: 0.6, ease: 'back.out(1.7)' });
  gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.7, delay: 0.5, ease: 'power2.out' });
  gsap.from('.hero-actions', { opacity: 0, y: 20, duration: 0.6, delay: 0.7, ease: 'power2.out' });
  gsap.from('.hero-stat', { opacity: 0, y: 20, stagger: 0.1, duration: 0.6, delay: 0.9, ease: 'power2.out' });
  gsap.from('.hero-scroll', { opacity: 0, duration: 0.8, delay: 1.3 });
}

// ─── IntersectionObserver（.fade-up） ───
function initFadeObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}
initFadeObserver();

// ─── スクロールプログレスバー ───
const progressBar = document.getElementById('scrollProgress');
lenis.on('scroll', ({ progress }) => {
  progressBar.style.transform = `scaleX(${progress})`;
});

// ─── ヘッダースタイル変更 ───
const header = document.getElementById('header');
lenis.on('scroll', ({ scroll }) => {
  header.classList.toggle('scrolled', scroll > 80);
});

// ─── Back to Top ───
const backTop = document.getElementById('backTop');
lenis.on('scroll', ({ scroll }) => {
  backTop.classList.toggle('show', scroll > 400);
});
backTop.addEventListener('click', () => lenis.scrollTo('#hero', { duration: 1.2 }));

// ─── ハンバーガーメニュー ───
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('is-open');
  mobileNav.classList.toggle('is-open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMobileNav() {
  hamburger.classList.remove('is-open');
  mobileNav.classList.remove('is-open');
  document.body.style.overflow = '';
}

// ─── カテゴリタブのアクティブ管理 ───
const catTabs = document.querySelectorAll('.cat-tab');

catTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.getElementById(tab.dataset.target);
    if (target) {
      lenis.scrollTo(target, { offset: -130, duration: 1.0, ease: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  });
});

// スクロール位置に応じてタブをアクティブに
const catSections = document.querySelectorAll('.cat-section');
const tabsSection = document.getElementById('catTabsSection');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.id;
      catTabs.forEach(t => t.classList.toggle('active', t.dataset.target === id));
      // アクティブタブを中央にスクロール
      const activeTab = document.querySelector(`.cat-tab[data-target="${id}"]`);
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

catSections.forEach(s => sectionObserver.observe(s));

// ─── ナビアンカーリンクのスムーズスクロール ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      closeMobileNav();
      lenis.scrollTo(target, { offset: -80, duration: 1.0 });
    }
  });
});

// ─── GSAP ScrollTrigger アニメーション ───
// カテゴリオーバービューカード
ScrollTrigger.batch('.info-card.fade-up', {
  start: 'top 88%',
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 30,
      stagger: 0.07,
      duration: 0.6,
      ease: 'power2.out',
      overwrite: true,
    });
  }
});

// ツールカード
ScrollTrigger.batch('.tool-card.fade-up', {
  start: 'top 85%',
  onEnter: (elements) => {
    gsap.from(elements, {
      opacity: 0,
      y: 40,
      scale: 0.96,
      stagger: 0.08,
      duration: 0.7,
      ease: 'back.out(1.4)',
      overwrite: true,
    });
  }
});

// ─── キーボードショートカット ───
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─── ツールカードアイコンタイル色 ───
const toolColors = [
  '#00c9a7', '#c9a84c', '#3b9eca', '#e74c3c',
  '#00c9a7', '#c9a84c', '#ff6b9d', '#6366f1',
  '#00c9a7', '#f59e0b'
];
document.querySelectorAll('.tool-card .tool-card-icon').forEach((el, i) => {
  if (!el.style.background) el.style.background = `${toolColors[i % toolColors.length]}22`;
});

// ─── ヒーロー背景パーティクル（軽量版） ───
(function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  for (let i = 0; i < 18; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:absolute;
      width:${2 + Math.random() * 4}px;
      height:${2 + Math.random() * 4}px;
      background:rgba(0,201,167,${0.1 + Math.random() * 0.2});
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      pointer-events:none;
      animation:float${i % 3} ${4 + Math.random() * 8}s ease-in-out infinite;
      animation-delay:-${Math.random() * 5}s;
    `;
    hero.appendChild(dot);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes float0 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-20px) translateX(10px)} }
    @keyframes float1 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(15px) translateX(-12px)} }
    @keyframes float2 { 0%,100%{transform:translateY(0) translateX(0)} 50%{transform:translateY(-10px) translateX(-8px)} }
  `;
  document.head.appendChild(style);
})();

console.log('🦷 歯科経営コンパス — Loaded successfully');

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

// ─── ツールカードの出現アニメーション ───
// 以前はGSAP ScrollTrigger.batchを使っていたが、CSSの.fade-up
// （IntersectionObserver制御）と同一要素のtransform/opacityを奪い合い、
// back.outの残留transformでカードがグリッド上で縦ズレしていた。
// 出現演出はCSSの.fade-up系に一本化し、競合を解消する。

// ─── モーダル・ドロワー内スクロールをLenisから独立させる ───
document.getElementById('modalContent')?.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });
document.getElementById('drawerBody')?.addEventListener('wheel', (e) => e.stopPropagation(), { passive: true });

// ─── キーボードショートカット ───
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeModal(); closeCardDrawer(); }
});
document.getElementById('cardDrawerOverlay')?.addEventListener('click', closeCardDrawer);
document.getElementById('drawerCloseBtn')?.addEventListener('click', closeCardDrawer);
document.getElementById('drawerTabs')?.addEventListener('click', e => {
  const tab = e.target.closest('.drawer-tab');
  if (tab?.dataset.tab) switchDrawerTab(tab.dataset.tab);
});

// ─── カードホバープレビュー ───
let _pvTimer;

function showCardPreview(card) {
  const preview = document.getElementById('cardPreview');
  if (!preview) return;

  const key      = card.dataset.cardKey;
  const title    = card.dataset.cardTitle;
  const catTitle = card.dataset.catTitle;
  const catColor = card.dataset.catColor;

  // カテゴリ・タイトル
  const catEl = document.getElementById('cpCatLabel');
  catEl.textContent   = catTitle || '';
  catEl.style.color   = catColor || 'var(--teal)';
  document.getElementById('cpTitle').textContent = title || '';

  // リード文（CARD_DETAILS）
  const data = typeof CARD_DETAILS !== 'undefined' ? CARD_DETAILS[key] : null;
  const leadEl = document.getElementById('cpLead');
  if (data?.lead) {
    leadEl.textContent = data.lead.length > 110 ? data.lead.slice(0, 110) + '…' : data.lead;
    leadEl.style.display = 'block';
  } else {
    leadEl.style.display = 'none';
  }

  // カードの items（先頭3件、リード文がないとき）
  const parts    = key.split('-');
  const cardIdx  = parseInt(parts[parts.length - 1]);
  const catId    = parts.slice(0, -1).join('-');
  const cat      = typeof CATEGORIES !== 'undefined' ? CATEGORIES.find(c => c.id === catId) : null;
  const cardData = cat?.cards[cardIdx];
  const itemsEl  = document.getElementById('cpItems');
  if (!data?.lead && cardData?.items?.length) {
    itemsEl.innerHTML = cardData.items.slice(0, 3).map(it => `<li>${it}</li>`).join('');
    itemsEl.style.display = 'block';
  } else {
    itemsEl.style.display = 'none';
  }

  // 表示 & ポジション計算
  preview.style.visibility = 'hidden';
  preview.style.display    = 'block';
  preview.style.opacity    = '0';

  const rect  = card.getBoundingClientRect();
  const vw    = window.innerWidth;
  const vh    = window.innerHeight;
  const pw    = preview.offsetWidth  || 270;
  const ph    = preview.offsetHeight || 150;

  let left, top;
  if (rect.right + pw + 16 <= vw) {
    left = rect.right + 12;
    top  = rect.top + rect.height / 2 - ph / 2;
  } else if (rect.left - pw - 12 >= 0) {
    left = rect.left - pw - 12;
    top  = rect.top + rect.height / 2 - ph / 2;
  } else {
    left = rect.left;
    top  = rect.top - ph - 10;
  }

  preview.style.left       = `${Math.max(8, Math.min(vw - pw - 8, left))}px`;
  preview.style.top        = `${Math.max(8, Math.min(vh - ph - 8, top))}px`;
  preview.style.visibility = 'visible';
  preview.style.opacity    = '1';
}

function hideCardPreview() {
  const preview = document.getElementById('cardPreview');
  if (!preview) return;
  preview.style.opacity = '0';
  setTimeout(() => { preview.style.display = 'none'; }, 180);
}

// ─── ホバーイベント（タッチデバイスは除外） ───
(function initCardHoverPreview() {
  if (!window.matchMedia('(hover: hover)').matches) return;

  document.addEventListener('mouseover', e => {
    if (window.innerWidth < 900) return;
    const card = e.target.closest('.card-clickable');
    if (!card) return;
    clearTimeout(_pvTimer);
    _pvTimer = setTimeout(() => showCardPreview(card), 280);
  });

  document.addEventListener('mouseout', e => {
    const card = e.target.closest('.card-clickable');
    if (!card || card.contains(e.relatedTarget)) return;
    clearTimeout(_pvTimer);
    hideCardPreview();
  });
})();

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

console.log('歯科経営コンパス — Loaded successfully');

// ─── ドロワー ツールマップ ───
const DRAWER_TOOL_MAP = {
  'cat-01': { id: 'tool1',  label: '開業資金シミュレーター',   desc: '開業に必要な資金を自動計算・シミュレート' },
  'cat-02': { id: 'tool2',  label: '月商・利益シミュレーター', desc: '月次収支の目標設定と収支試算' },
  'cat-03': { id: 'tool3',  label: '開業スケジュール自動生成', desc: '段階別タスクリストを自動生成' },
  'cat-04': { id: 'tool4',  label: '行政届出チェックリスト',   desc: '必要書類・窓口をまとめて確認' },
  'cat-05': { id: 'tool5',  label: '施設基準・加算チェック',   desc: '算定可能な加算を自動診断' },
  'cat-07': { id: 'tool10', label: '収益改善セルフチェック',   desc: '50項目で経営課題を可視化' },
  'cat-08': { id: 'tool7',  label: '医療広告チェッカー',       desc: '広告文の適法性を即時確認' },
  'cat-10': { id: 'tool9',  label: '求人票ジェネレーター',     desc: '採用力の高い求人票を自動生成' },
  'cat-15': { id: 'tool6',  label: 'KPIダッシュボード',        desc: '経営指標をリアルタイム管理' },
};

// ─── カード詳細ドロワー ───
function openCardDrawer(card) {
  const key      = card.dataset.cardKey;
  const title    = card.dataset.cardTitle;
  const catTitle = card.dataset.catTitle;
  const catColor = card.dataset.catColor;

  // catId・cardIdx を key から復元
  const parts   = key.split('-');
  const cardIdx = parseInt(parts[parts.length - 1]);
  const catId   = parts.slice(0, -1).join('-');

  const drawer  = document.getElementById('cardDrawer');
  const overlay = document.getElementById('cardDrawerOverlay');
  const header  = document.getElementById('drawerHeader');

  document.getElementById('drawerTitle').textContent    = title || '';
  document.getElementById('drawerCatLabel').textContent = catTitle || '';
  document.getElementById('drawerCatLabel').style.color = catColor || 'var(--teal)';
  header.style.borderTopColor = catColor || 'var(--teal)';

  const data = (typeof CARD_DETAILS !== 'undefined') ? CARD_DETAILS[key] : null;

  // タブ 1: 概要
  document.getElementById('dpOverview').innerHTML = data
    ? buildDetailHtml(data, key)
    : '<p class="drawer-empty">詳細情報は近日公開予定です。</p>';

  // タブ 2: チェックリスト
  document.getElementById('dpChecklist').innerHTML = buildChecklistHtml(data, key);
  initChecklist(key);

  // タブ 3: 関連ツール
  document.getElementById('dpTools').innerHTML = buildDrawerToolsHtml(catId, catColor, cardIdx);
  initDrawerTools();

  switchDrawerTab('overview');
  document.getElementById('drawerBody').scrollTop = 0;
  drawer.classList.add('is-open');
  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  lenis.stop();
}

function closeCardDrawer() {
  document.getElementById('cardDrawer')?.classList.remove('is-open');
  document.getElementById('cardDrawerOverlay')?.classList.remove('is-open');
  document.body.style.overflow = '';
  lenis.start();
}

function switchDrawerTab(tab) {
  document.querySelectorAll('.drawer-tab').forEach(t =>
    t.classList.toggle('is-active', t.dataset.tab === tab)
  );
  const panelId = 'dp' + tab.charAt(0).toUpperCase() + tab.slice(1);
  document.querySelectorAll('.drawer-panel').forEach(p =>
    p.classList.toggle('is-active', p.id === panelId)
  );
  document.getElementById('drawerBody').scrollTop = 0;
}

// ─── チェックリスト生成 ───
function buildChecklistHtml(data, key) {
  const parts    = key.split('-');
  const cardIdx  = parseInt(parts[parts.length - 1]);
  const catId    = parts.slice(0, -1).join('-');

  const items = [];

  // CARD_DETAILS の list/steps セクションを優先使用
  if (data?.sections) {
    data.sections.forEach(sec => {
      if (sec.type === 'list') {
        if (sec.heading) items.push({ type: 'h', text: sec.heading });
        sec.items.forEach(it => {
          items.push({ type: 'i', text: typeof it === 'string' ? it : `${it.label}：${it.text}` });
        });
      }
      if (sec.type === 'steps') {
        if (sec.heading) items.push({ type: 'h', text: sec.heading });
        sec.items.forEach(it => items.push({ type: 'i', text: it.title + (it.desc ? `：${it.desc}` : '') }));
      }
    });
  }

  // フォールバック: カードの summary items をチェックリスト化
  if (!items.some(i => i.type === 'i') && typeof CATEGORIES !== 'undefined') {
    const cat  = CATEGORIES.find(c => c.id === catId);
    const card = cat?.cards[cardIdx];
    if (card?.items?.length) {
      card.items.forEach(it => items.push({ type: 'i', text: it }));
    }
  }

  const checkItems = items.filter(i => i.type === 'i');
  if (!checkItems.length) return '<p class="drawer-empty">このカードにはチェックリストがありません。</p>';

  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(`dc_cl_${key}`)) || []; } catch {}
  const done  = saved.filter(Boolean).length;
  const total = checkItems.length;
  const pct   = total ? Math.round(done / total * 100) : 0;

  const CHECK_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>';

  let idx = 0;
  let html = `
    <div class="cl-progress">
      <div class="cl-progress-top">
        <span class="cl-label">チェック進捗</span>
        <span class="cl-count" id="clCount">${done} / ${total} 完了</span>
      </div>
      <div class="cl-bar-bg"><div class="cl-bar" id="clBar" style="width:${pct}%"></div></div>
    </div>
    <div class="cl-list" data-key="${key}">`;

  items.forEach(item => {
    if (item.type === 'h') {
      html += `<div class="cl-group-label">${item.text}</div>`;
    } else {
      const checked = !!saved[idx];
      html += `<label class="cl-item${checked ? ' is-done' : ''}" data-idx="${idx}">
        <span class="cl-box">${checked ? CHECK_SVG : ''}</span>
        <span class="cl-text">${item.text}</span>
        <input type="checkbox"${checked ? ' checked' : ''} class="cl-hidden-cb">
      </label>`;
      idx++;
    }
  });

  html += '</div>';
  if (pct === 100) html += '<div class="cl-complete">全項目チェック完了！</div>';
  return html;
}

function initChecklist(key) {
  const list = document.querySelector(`.cl-list[data-key="${key}"]`);
  if (!list) return;

  const CHECK_SVG = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5"><polyline points="20 6 9 17 4 12"/></svg>';
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(`dc_cl_${key}`)) || []; } catch {}

  list.querySelectorAll('.cl-item').forEach(label => {
    label.addEventListener('click', e => {
      e.preventDefault();
      const idx    = parseInt(label.dataset.idx);
      const newVal = !saved[idx];
      saved[idx]   = newVal;
      try { localStorage.setItem(`dc_cl_${key}`, JSON.stringify(saved)); } catch {}

      label.classList.toggle('is-done', newVal);
      label.querySelector('.cl-box').innerHTML = newVal ? CHECK_SVG : '';

      const total = list.querySelectorAll('.cl-item').length;
      const done  = saved.filter(Boolean).length;
      const pct   = Math.round(done / total * 100);
      const countEl = document.getElementById('clCount');
      const barEl   = document.getElementById('clBar');
      if (countEl) countEl.textContent = `${done} / ${total} 完了`;
      if (barEl)   barEl.style.width = `${pct}%`;

      if (pct === 100 && !document.querySelector('.cl-complete')) {
        list.insertAdjacentHTML('afterend', '<div class="cl-complete">全項目チェック完了！</div>');
      }
    });
  });
}

// ─── 関連ツールタブ生成 ───
function buildDrawerToolsHtml(catId, catColor, currentIdx) {
  const tool = DRAWER_TOOL_MAP[catId];
  let html = '';

  if (tool) {
    html += `
      <div class="dt-section-label">このカテゴリのツール</div>
      <div class="dt-tool-card" data-tool-id="${tool.id}">
        <div class="dt-tool-icon" style="background:${catColor}18;color:${catColor}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
        </div>
        <div class="dt-tool-body">
          <div class="dt-tool-name">${tool.label}</div>
          <div class="dt-tool-desc">${tool.desc}</div>
        </div>
        <svg class="dt-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </div>`;
  } else {
    html += '<p class="drawer-empty" style="margin-bottom:1.5rem;">このカテゴリに関連ツールはまだありません。</p>';
  }

  if (typeof CATEGORIES !== 'undefined') {
    const cat     = CATEGORIES.find(c => c.id === catId);
    const related = cat ? cat.cards.map((c, i) => ({ ...c, idx: i })).filter(c => c.idx !== currentIdx).slice(0, 4) : [];
    if (related.length) {
      html += `<div class="dt-section-label" style="margin-top:1.5rem;">同カテゴリの他の情報</div><div class="dt-related-list">`;
      related.forEach(c => {
        html += `<div class="dt-related-item" data-rel-key="${catId}-${c.idx}">
          <span class="dt-related-icon">${c.icon}</span>
          <span class="dt-related-title">${c.title}</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </div>`;
      });
      html += '</div>';
    }
  }

  return html;
}

function initDrawerTools() {
  document.querySelector('.dt-tool-card[data-tool-id]')?.addEventListener('click', function () {
    const tid = this.dataset.toolId;
    closeCardDrawer();
    setTimeout(() => openModal(tid), 250);
  });

  document.querySelectorAll('.dt-related-item[data-rel-key]').forEach(el => {
    el.addEventListener('click', () => {
      const relKey = el.dataset.relKey;
      closeCardDrawer();
      setTimeout(() => {
        const target = document.querySelector(`[data-card-key="${relKey}"]`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => openCardDrawer(target), 650);
        }
      }, 250);
    });
  });
}

// ─── 旧: インライン展開（後方互換） ───
function toggleCardDetail(card) {
  card.classList.toggle('is-open');
}

// ─── NEW バッジ & ニュースバナー ───────────────────────────────────
(async function applyNewsBadges() {
  try {
    const res = await fetch('/dental-compass/data/news.json?_=' + Date.now());
    if (!res.ok) return;
    const data = await res.json();

    const today = new Date(Date.now() + 9 * 3600 * 1000).toISOString().split('T')[0];
    const active = (data.updates || []).filter(u => u.expires >= today);
    if (!active.length) return;

    // カードにバッジを付与（cat_id ごとに1つ）
    const seen = new Set();
    active.forEach(u => {
      if (seen.has(u.cat_id)) return;
      seen.add(u.cat_id);
      const card = document.querySelector(`a.info-card[href="#${u.cat_id}"]`);
      if (!card) return;
      const badge = document.createElement('span');
      badge.className = 'badge-new';
      badge.textContent = 'NEW';
      card.appendChild(badge);
    });

    // ニュースバナー表示
    const banner = document.getElementById('news-banner');
    const textEl = banner?.querySelector('.news-banner-text');
    if (banner && textEl) {
      const labels = [...new Set(active.map(u => u.label))];
      const shortened = labels.slice(0, 3).join('・') + (labels.length > 3 ? `他${labels.length - 3}件` : '');
      textEl.innerHTML = `<strong>情報更新あり</strong>　${shortened}`;
      banner.classList.add('is-visible');
    }
  } catch (_) {
    // fetch 失敗は無視（ネットワーク不可・ファイル未生成等）
  }
})();

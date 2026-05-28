// =====================================================
// 歯科経営コンパス — 全文検索
// =====================================================
(function () {
  'use strict';

  // ─── テキスト抽出 ───
  function extractDetailText(data) {
    if (!data) return '';
    let t = data.lead || '';
    (data.sections || []).forEach(sec => {
      if (sec.heading) t += ' ' + sec.heading;
      if (sec.type === 'list') {
        (sec.items || []).forEach(item => {
          t += ' ' + (typeof item === 'string' ? item : (item.label || '') + ' ' + (item.text || ''));
        });
      }
      if (sec.type === 'steps') {
        (sec.items || []).forEach(item => { t += ' ' + (item.title || '') + ' ' + (item.desc || ''); });
      }
      if (sec.type === 'table') {
        (sec.rows || []).forEach(row => { t += ' ' + row.join(' '); });
        if (sec.headers) t += ' ' + sec.headers.join(' ');
      }
      if (sec.type === 'alert') t += ' ' + (sec.text || '');
      if (sec.type === 'links') {
        (sec.items || []).forEach(lnk => { t += ' ' + lnk.label + ' ' + (lnk.desc || ''); });
      }
    });
    return t;
  }

  // ─── インデックス構築 ───
  function buildIndex() {
    if (typeof CATEGORIES === 'undefined') return [];
    const idx = [];
    CATEGORIES.forEach(cat => {
      cat.cards.forEach((card, ci) => {
        const key  = `${cat.id}-${ci}`;
        const det  = typeof CARD_DETAILS !== 'undefined' ? CARD_DETAILS[key] : null;
        const text = [
          cat.title, card.title,
          (card.items || []).join(' '),
          extractDetailText(det),
        ].join(' ').toLowerCase();
        idx.push({ key, catId: cat.id, catTitle: cat.title, catColor: cat.color, cardTitle: card.title, text });
      });
    });
    return idx;
  }

  let INDEX = null;

  function query(q) {
    if (!INDEX) INDEX = buildIndex();
    if (!q || q.trim().length < 2) return [];
    const words = q.toLowerCase().trim().split(/[\s　]+/);
    return INDEX.filter(e => words.every(w => e.text.includes(w))).slice(0, 12);
  }

  // ─── UI ───
  function initSearch() {
    const modal    = document.getElementById('searchModal');
    const overlay  = document.getElementById('searchOverlay');
    const input    = document.getElementById('searchInput');
    const results  = document.getElementById('searchResults');
    const closeBtn = document.getElementById('searchClose');
    if (!modal) return;

    function open() {
      modal.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input.focus(), 80);
    }
    function close() {
      modal.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      input.value = '';
      results.innerHTML = '<p class="search-hint">キーワードを入力してください</p>';
    }

    document.querySelectorAll('.search-trigger').forEach(t => t.addEventListener('click', open));
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); }
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });

    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => render(query(input.value)), 180);
    });

    function render(items) {
      if (!items.length) {
        results.innerHTML = input.value.trim().length >= 2
          ? '<p class="search-empty">「' + input.value + '」は見つかりませんでした</p>'
          : '<p class="search-hint">キーワードを入力してください</p>';
        return;
      }
      results.innerHTML = items.map(it => `
        <div class="search-result-item" data-cat="${it.catId}">
          <div class="sri-cat" style="color:${it.catColor}">${it.catTitle}</div>
          <div class="sri-title">${it.cardTitle}</div>
        </div>`).join('');
      results.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', () => {
          const target = document.getElementById(el.dataset.cat);
          if (!target) return;
          close();
          setTimeout(() => {
            if (window.lenis) lenis.scrollTo(target, { offset: -130, duration: 1.2 });
            else target.scrollIntoView({ behavior: 'smooth' });
          }, 200);
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();

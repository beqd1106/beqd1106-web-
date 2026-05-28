// =====================================================
// 歯科経営コンパス — 全文検索 v2
// キーボードナビ・スニペット・履歴・カテゴリフィルタ
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
        (sec.items || []).forEach(it =>
          t += ' ' + (typeof it === 'string' ? it : (it.label || '') + ' ' + (it.text || ''))
        );
      }
      if (sec.type === 'steps') {
        (sec.items || []).forEach(it => t += ' ' + (it.title || '') + ' ' + (it.desc || ''));
      }
      if (sec.type === 'table') {
        (sec.rows || []).forEach(row => t += ' ' + row.join(' '));
        if (sec.headers) t += ' ' + sec.headers.join(' ');
      }
      if (sec.type === 'alert') t += ' ' + (sec.text || '');
      if (sec.type === 'links') {
        (sec.items || []).forEach(lnk => t += ' ' + lnk.label + ' ' + (lnk.desc || ''));
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
        const key    = `${cat.id}-${ci}`;
        const det    = typeof CARD_DETAILS !== 'undefined' ? CARD_DETAILS[key] : null;
        const items  = (card.items || []).join(' ');
        const detail = extractDetailText(det);
        const snippet = det?.lead
          ? det.lead.slice(0, 90)
          : card.items?.[0]?.slice(0, 90) || '';
        idx.push({
          key,
          catId:     cat.id,
          catTitle:  cat.title,
          catColor:  cat.color,
          cardTitle: card.title,
          snippet:   snippet.replace(/<[^>]+>/g, ''),
          // weighted text: title 3×, cat 2×, content 1×
          text: (
            (cat.title + ' ').repeat(2) +
            (card.title + ' ').repeat(3) +
            items + ' ' + detail
          ).toLowerCase(),
        });
      });
    });
    return idx;
  }

  let INDEX = null;

  // ─── スコアリング付き検索 ───
  function search(q, catFilter) {
    if (!INDEX) INDEX = buildIndex();
    const words = q.toLowerCase().trim().split(/[\s　]+/).filter(w => w.length > 0);
    if (!words.length) return [];

    const results = INDEX
      .map(e => {
        // all words must match
        for (const w of words) {
          if (!e.text.includes(w)) return null;
        }
        let score = 0;
        for (const w of words) {
          if (e.cardTitle.toLowerCase().includes(w)) score += 4;
          else if (e.catTitle.toLowerCase().includes(w)) score += 2;
          else score += 1;
        }
        return { ...e, score };
      })
      .filter(Boolean);

    const filtered = catFilter ? results.filter(r => r.catId === catFilter) : results;
    return filtered.sort((a, b) => b.score - a.score).slice(0, 18);
  }

  // ─── ハイライト ───
  function hl(text, words) {
    if (!text || !words.length) return text;
    const esc = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    return text.replace(new RegExp(`(${esc.join('|')})`, 'gi'), '<mark class="sh">$1</mark>');
  }

  // ─── 最近の検索 ───
  const REC_KEY = 'dc_search_recent';
  function loadRecent() {
    try { return JSON.parse(localStorage.getItem(REC_KEY)) || []; } catch { return []; }
  }
  function saveRecent(q) {
    if (q.trim().length < 2) return;
    const rec = loadRecent().filter(r => r !== q.trim());
    rec.unshift(q.trim());
    try { localStorage.setItem(REC_KEY, JSON.stringify(rec.slice(0, 7))); } catch {}
  }
  function clearRecent() {
    try { localStorage.removeItem(REC_KEY); } catch {}
  }

  // ─── UI ───
  function initSearch() {
    const modal    = document.getElementById('searchModal');
    const overlay  = document.getElementById('searchOverlay');
    const input    = document.getElementById('searchInput');
    const results  = document.getElementById('searchResults');
    const closeBtn = document.getElementById('searchClose');
    const catFilter = document.getElementById('searchCatFilter');
    if (!modal) return;

    let selectedIdx  = -1;
    let activeCat    = '';
    let currentQuery = '';

    function open() {
      modal.classList.add('is-open');
      overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      selectedIdx = -1;
      setTimeout(() => { input.focus(); if (!input.value) showRecent(); }, 80);
    }

    function close() {
      modal.classList.remove('is-open');
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      input.value   = '';
      currentQuery  = '';
      activeCat     = '';
      selectedIdx   = -1;
      if (catFilter) catFilter.style.display = 'none';
      results.innerHTML = '<p class="search-hint">キーワードを入力してください</p>';
    }

    document.querySelectorAll('.search-trigger').forEach(t => t.addEventListener('click', open));
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);

    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); open(); return; }
      if (!modal.classList.contains('is-open')) return;
      switch (e.key) {
        case 'Escape':     e.preventDefault(); close(); break;
        case 'ArrowDown':  e.preventDefault(); moveSelection(+1); break;
        case 'ArrowUp':    e.preventDefault(); moveSelection(-1); break;
        case 'Enter':      e.preventDefault(); selectActive(); break;
      }
    });

    function getItems() {
      return Array.from(results.querySelectorAll('.search-result-item'));
    }

    function moveSelection(dir) {
      const items = getItems();
      if (!items.length) return;
      if (selectedIdx >= 0) items[selectedIdx]?.classList.remove('is-selected');
      selectedIdx = (selectedIdx + dir + items.length) % items.length;
      const el = items[selectedIdx];
      el.classList.add('is-selected');
      el.scrollIntoView({ block: 'nearest' });
    }

    function selectActive() {
      const items = getItems();
      const el = (selectedIdx >= 0 ? items[selectedIdx] : null) || items[0];
      if (el) el.click();
    }

    function showRecent() {
      const rec = loadRecent();
      if (!rec.length) {
        results.innerHTML = '<p class="search-hint">キーワードを入力してください</p>';
        return;
      }
      results.innerHTML = `
        <div class="search-recent-row">
          <span class="search-recent-header">最近の検索</span>
          <button class="search-recent-clear" id="srClear">クリア</button>
        </div>
        ${rec.map(r => `
          <div class="search-result-item search-recent-item" data-query="${r.replace(/"/g, '&quot;')}">
            <svg class="sri-icon" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 0 .5-4"/><polyline points="3 3 3 7 7 7"/></svg>
            <span class="sri-recent-text">${r}</span>
          </div>`).join('')}`;
      document.getElementById('srClear')?.addEventListener('click', e => {
        e.stopPropagation(); clearRecent(); showRecent();
      });
      results.querySelectorAll('[data-query]').forEach(el => {
        el.addEventListener('click', () => {
          input.value = el.dataset.query;
          runSearch(el.dataset.query);
        });
      });
    }

    function buildCatPills(items) {
      if (!catFilter || items.length < 3) {
        if (catFilter) catFilter.style.display = 'none';
        return;
      }
      const catMap = {};
      items.forEach(it => {
        if (!catMap[it.catId]) catMap[it.catId] = { title: it.catTitle, color: it.catColor, count: 0 };
        catMap[it.catId].count++;
      });
      const cats = Object.entries(catMap).slice(0, 7);
      catFilter.innerHTML =
        `<button class="cat-pill${!activeCat ? ' active' : ''}" data-cat="">すべて <span>${items.length}</span></button>` +
        cats.map(([id, c]) =>
          `<button class="cat-pill${activeCat === id ? ' active' : ''}" data-cat="${id}" style="--pc:${c.color}">${c.title} <span>${c.count}</span></button>`
        ).join('');
      catFilter.style.display = 'flex';
      catFilter.querySelectorAll('.cat-pill').forEach(pill => {
        pill.addEventListener('click', () => { activeCat = pill.dataset.cat; runSearch(currentQuery); });
      });
    }

    function runSearch(q) {
      currentQuery = q;
      selectedIdx  = -1;
      const words  = q.trim().toLowerCase().split(/[\s　]+/).filter(Boolean);

      if (!q.trim()) { showRecent(); if (catFilter) catFilter.style.display = 'none'; return; }

      const all   = search(q, '');
      const shown = activeCat ? all.filter(r => r.catId === activeCat) : all;

      buildCatPills(all);

      if (!shown.length) {
        results.innerHTML = `<p class="search-empty">「${q}」に一致する記事が見つかりませんでした</p>`;
        return;
      }

      results.innerHTML = shown.map(it => {
        const snip = it.snippet ? hl(it.snippet + (it.snippet.length >= 88 ? '…' : ''), words) : '';
        return `
          <div class="search-result-item" data-cat="${it.catId}">
            <div class="sri-meta">
              <span class="sri-cat-badge" style="background:${it.catColor}22;color:${it.catColor}">${it.catTitle}</span>
            </div>
            <div class="sri-title">${hl(it.cardTitle, words)}</div>
            ${snip ? `<div class="sri-snippet">${snip}</div>` : ''}
          </div>`;
      }).join('');

      results.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
          getItems().forEach(i => i.classList.remove('is-selected'));
          selectedIdx = getItems().indexOf(el);
          el.classList.add('is-selected');
        });
        el.addEventListener('click', () => {
          const target = document.getElementById(el.dataset.cat);
          if (!target) return;
          saveRecent(currentQuery);
          close();
          setTimeout(() => {
            if (window.lenis) lenis.scrollTo(target, { offset: -130, duration: 1.2 });
            else target.scrollIntoView({ behavior: 'smooth' });
          }, 200);
        });
      });
    }

    let timer;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      selectedIdx = -1;
      if (!input.value.trim()) { showRecent(); if (catFilter) catFilter.style.display = 'none'; return; }
      timer = setTimeout(() => runSearch(input.value), 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();

/* ================================================================
   障碍者福祉 運営ガイド — サイト内検索
   Ctrl+K または ボタン でモーダルを開く
================================================================ */
(function () {
  'use strict';

  // ── ページのベースパス（フォーマット/ 以下は ../ が必要）──────────
  const IS_SUBDIR = location.pathname.includes('/フォーマット/') ||
                    location.pathname.includes('/format/');
  const BASE = IS_SUBDIR ? '../' : '';

  // ── Ctrl+K ショートカット ────────────────────────────────────────
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
  });

  // ── ナビに検索ボタンを自動挿入 ──────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector('.site-nav');
    if (!nav) return;
    const btn = document.createElement('button');
    btn.className = 'search-nav-btn';
    btn.setAttribute('aria-label', 'サイト内検索');
    btn.innerHTML = '検索 <kbd>Ctrl+K</kbd>';
    btn.addEventListener('click', openSearch);
    nav.insertBefore(btn, nav.firstChild);
  });

  // ── モーダル構築 ─────────────────────────────────────────────────
  function buildModal() {
    const modal = document.createElement('div');
    modal.id = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'サイト内検索');
    modal.innerHTML = `
      <div id="search-overlay"></div>
      <div id="search-box">
        <div id="search-input-wrap">
          <span id="search-icon-label"></span>
          <input id="search-input" type="text"
            placeholder="加算名・書類名・キーワードを入力..."
            autocomplete="off" spellcheck="false">
          <button id="search-close-btn" aria-label="閉じる">✕</button>
        </div>
        <div id="search-results" role="listbox"></div>
        <div id="search-footer">
          <span>↑↓ で移動</span><span>Enter で開く</span><span>ESC で閉じる</span>
        </div>
      </div>`;
    document.body.appendChild(modal);

    document.getElementById('search-overlay').addEventListener('click', closeSearch);
    document.getElementById('search-close-btn').addEventListener('click', closeSearch);

    const input = document.getElementById('search-input');
    input.addEventListener('input', debounce(doSearch, 120));
    input.addEventListener('keydown', handleKeys);
  }

  // ── 検索実行 ─────────────────────────────────────────────────────
  let currentIdx = -1;

  function doSearch() {
    const q = document.getElementById('search-input').value.trim();
    const container = document.getElementById('search-results');
    if (!q) {
      container.innerHTML = '<div class="search-empty">キーワードを入力してください</div>';
      currentIdx = -1;
      return;
    }
    if (typeof SEARCH_DATA === 'undefined') {
      container.innerHTML = '<div class="search-empty">検索データを読み込み中...</div>';
      return;
    }

    const hits = rank(q, SEARCH_DATA).slice(0, 15);
    if (hits.length === 0) {
      container.innerHTML = `<div class="search-empty">「${q}」に一致する項目が見つかりませんでした</div>`;
      return;
    }

    container.innerHTML = hits.map((h, i) => {
      const href = BASE + h.page;
      const snippet = highlight(h.text.slice(0, 90), q);
      const typeIcon = { table:'', alert:'⚠', popup:'', text:'', file:'' }[h.type] || '';
      return `<a class="search-item" href="${href}" data-idx="${i}" role="option">
        <div class="si-meta">
          <span class="si-page">${h.pageTitle}</span>
          <span class="si-type">${typeIcon}</span>
        </div>
        <div class="si-section">${highlight(h.section, q)}</div>
        <div class="si-snippet">${snippet}…</div>
      </a>`;
    }).join('');

    // クリック時に閉じる
    container.querySelectorAll('.search-item').forEach(el => {
      el.addEventListener('click', closeSearch);
    });

    currentIdx = -1;
  }

  // ── スコアリング ─────────────────────────────────────────────────
  function rank(q, data) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return data
      .map(entry => {
        let score = 0;
        const sec  = entry.section.toLowerCase();
        const text = entry.text.toLowerCase();
        const page = entry.pageTitle.toLowerCase();
        terms.forEach(t => {
          if (sec.includes(t))  score += 5;
          if (page.includes(t)) score += 3;
          if (text.includes(t)) score += 1;
          // 完全一致ボーナス
          if (sec === t || sec.startsWith(t)) score += 4;
        });
        return { ...entry, score };
      })
      .filter(e => e.score > 0)
      .sort((a, b) => b.score - a.score);
  }

  // ── ハイライト ───────────────────────────────────────────────────
  function highlight(text, q) {
    const terms = q.split(/\s+/).filter(Boolean);
    let result = escapeHtml(text);
    terms.forEach(t => {
      const re = new RegExp(`(${escapeRe(t)})`, 'gi');
      result = result.replace(re, '<mark>$1</mark>');
    });
    return result;
  }
  function escapeHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ── キーボード操作 ───────────────────────────────────────────────
  function handleKeys(e) {
    const items = document.querySelectorAll('.search-item');
    if (!items.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      currentIdx = Math.min(currentIdx + 1, items.length - 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      currentIdx = Math.max(currentIdx - 1, 0);
    } else if (e.key === 'Enter') {
      if (currentIdx >= 0) { e.preventDefault(); items[currentIdx].click(); }
      return;
    } else if (e.key === 'Escape') {
      closeSearch(); return;
    } else {
      return;
    }
    items.forEach((el, i) => el.classList.toggle('active', i === currentIdx));
    items[currentIdx]?.scrollIntoView({ block: 'nearest' });
  }

  // ── ユーティリティ ───────────────────────────────────────────────
  function debounce(fn, ms) {
    let t;
    return function () { clearTimeout(t); t = setTimeout(() => fn.apply(this, arguments), ms); };
  }

  // ── 公開関数 ─────────────────────────────────────────────────────
  window.openSearch = function () {
    if (!document.getElementById('search-modal')) buildModal();
    const modal = document.getElementById('search-modal');
    modal.classList.add('open');
    const input = document.getElementById('search-input');
    input.value = '';
    document.getElementById('search-results').innerHTML =
      '<div class="search-empty">キーワードを入力してください</div>';
    setTimeout(() => input.focus(), 50);
    currentIdx = -1;
  };

  window.closeSearch = function () {
    const modal = document.getElementById('search-modal');
    if (modal) modal.classList.remove('open');
  };
})();

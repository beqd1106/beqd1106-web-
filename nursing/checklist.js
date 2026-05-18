/* ================================================================
   障碍者福祉 運営ガイド — 監査対応チェックリスト
   チェック状態を localStorage に保存し、ページ再読込後も維持する
================================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'audit_checklist_v1';

  // ── 保存・読み込み ───────────────────────────────────────────────
  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch {}
  }

  // ── 進捗バーの更新 ───────────────────────────────────────────────
  function updateProgress() {
    const all   = document.querySelectorAll('.cl-cb');
    const done  = document.querySelectorAll('.cl-cb:checked');
    const total = all.length, checked = done.length;
    const pct   = total ? Math.round(checked / total * 100) : 0;

    const bar  = document.getElementById('cl-bar-fill');
    const txt  = document.getElementById('cl-bar-text');
    const pctEl = document.getElementById('cl-bar-pct');
    if (bar)   bar.style.width = pct + '%';
    if (txt)   txt.textContent = `${checked} / ${total} 項目完了`;
    if (pctEl) pctEl.textContent = pct + '%';

    // カテゴリ別カウンタ更新
    document.querySelectorAll('.cl-group').forEach(function (grp) {
      const id = grp.dataset.group;
      const grpAll  = grp.querySelectorAll('.cl-cb').length;
      const grpDone = grp.querySelectorAll('.cl-cb:checked').length;
      const counter = document.getElementById('cl-count-' + id);
      if (counter) counter.textContent = grpDone + '/' + grpAll;
      grp.classList.toggle('cl-group-done', grpAll > 0 && grpAll === grpDone);
    });
  }

  // ── 初期化 ──────────────────────────────────────────────────────
  function init() {
    const state = load();
    const cbs = document.querySelectorAll('.cl-cb');
    if (!cbs.length) return;

    cbs.forEach(function (cb) {
      // 保存済み状態を復元
      if (state[cb.id]) {
        cb.checked = true;
        cb.closest('label')?.classList.add('cl-checked');
      }

      cb.addEventListener('change', function () {
        cb.closest('label')?.classList.toggle('cl-checked', cb.checked);
        state[cb.id] = cb.checked || undefined;
        if (!cb.checked) delete state[cb.id];
        save(state);
        updateProgress();
      });
    });

    updateProgress();
  }

  // ── リセット（グループ別 or 全体）───────────────────────────────
  window.resetChecklist = function (groupId) {
    const state = load();
    const selector = groupId
      ? '#cl-group-' + groupId + ' .cl-cb'
      : '.cl-cb';
    document.querySelectorAll(selector).forEach(function (cb) {
      cb.checked = false;
      cb.closest('label')?.classList.remove('cl-checked');
      delete state[cb.id];
    });
    save(state);
    updateProgress();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

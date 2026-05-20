/* ================================================================
   パスワード認証 — 障碍者福祉事業所 運営ガイド
   sessionStorage に認証フラグを保存（タブを閉じるとリセット）
================================================================ */
(function () {
  var SESSION_KEY = 'guide_auth_v1';

  /* すでに認証済みならスキップ */
  if (sessionStorage.getItem(SESSION_KEY) === '1') return;

  /* ── overlay HTML を生成 ────────────────────── */
  var overlay = document.createElement('div');
  overlay.id = 'auth-overlay';
  overlay.innerHTML = [
    '<div class="auth-bg"></div>',
    '<div class="auth-card">',
    '  <div class="auth-rings" aria-hidden="true"></div>',
    '  <div class="auth-logo">🏥</div>',
    '  <h1 class="auth-title">障碍者福祉事業所<br><span>運営ガイド</span></h1>',
    '  <p class="auth-sub">このサイトはパスワードで保護されています</p>',
    '  <form class="auth-form" id="auth-form" autocomplete="off">',
    '    <div class="auth-field">',
    '      <input type="password" id="auth-input" placeholder="パスワードを入力" autocomplete="current-password" />',
    '    </div>',
    '    <button type="submit" id="auth-btn">入る →</button>',
    '    <p class="auth-error" id="auth-error" aria-live="polite"></p>',
    '  </form>',
    '  <p class="auth-note">運営スタッフ専用サイトです</p>',
    '</div>',
  ].join('\n');

  /* ── スタイル ────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '#auth-overlay {',
    '  position:fixed; inset:0; z-index:99999;',
    '  display:flex; align-items:center; justify-content:center;',
    '  font-family:"Hiragino Sans","Noto Sans JP",system-ui,sans-serif;',
    '}',
    '.auth-bg {',
    '  position:absolute; inset:0;',
    '  background:linear-gradient(150deg,#FFF5EE 0%,#FDE8D8 50%,#FFF0E8 100%);',
    '}',
    '.auth-card {',
    '  position:relative; z-index:1;',
    '  background:#fff;',
    '  border-radius:28px;',
    '  padding:3rem 3rem 2.5rem;',
    '  width:min(420px,90vw);',
    '  box-shadow:0 16px 60px rgba(200,110,70,0.14),0 4px 16px rgba(200,110,70,0.08);',
    '  text-align:center;',
    '  overflow:hidden;',
    '}',
    /* 装飾円リング */
    '.auth-rings {',
    '  position:absolute; top:-5rem; right:-5rem;',
    '  width:18rem; height:18rem;',
    '  border-radius:50%;',
    '  border:2px solid rgba(240,149,106,0.2);',
    '  box-shadow:',
    '    0 0 0 2.5rem rgba(240,149,106,0.07),',
    '    0 0 0 5rem  rgba(240,149,106,0.045),',
    '    0 0 0 7.5rem rgba(240,149,106,0.025);',
    '  pointer-events:none;',
    '}',
    '.auth-logo {',
    '  font-size:2.8rem;',
    '  line-height:1;',
    '  margin-bottom:0.75rem;',
    '}',
    '.auth-title {',
    '  font-size:1.35rem;',
    '  font-weight:900;',
    '  line-height:1.35;',
    '  color:#2A2020;',
    '  letter-spacing:0.02em;',
    '  margin-bottom:0.4rem;',
    '}',
    '.auth-title span { color:#C87858; }',
    '.auth-sub {',
    '  font-size:0.8rem;',
    '  color:#8A7060;',
    '  margin-bottom:1.75rem;',
    '}',
    '.auth-field {',
    '  display:flex;',
    '  border:2px solid #F0DDD2;',
    '  border-radius:999px;',
    '  overflow:hidden;',
    '  transition:border-color 0.18s;',
    '}',
    '.auth-field:focus-within { border-color:#F0A882; }',
    '#auth-input {',
    '  width:100%;',
    '  border:none;',
    '  outline:none;',
    '  padding:0.75rem 1.25rem;',
    '  font-size:1rem;',
    '  background:transparent;',
    '  color:#2A2020;',
    '  font-family:inherit;',
    '}',
    '#auth-input::placeholder { color:#C0AFA0; }',
    '#auth-btn {',
    '  display:block;',
    '  width:100%;',
    '  margin-top:0.9rem;',
    '  padding:0.85rem;',
    '  background:#C87858;',
    '  color:white;',
    '  border:none;',
    '  border-radius:999px;',
    '  font-size:1rem;',
    '  font-weight:700;',
    '  font-family:inherit;',
    '  letter-spacing:0.05em;',
    '  cursor:pointer;',
    '  transition:background 0.18s,transform 0.1s;',
    '}',
    '#auth-btn:hover { background:#F0A882; }',
    '#auth-btn:active { transform:scale(0.97); }',
    '.auth-error {',
    '  color:#E88080;',
    '  font-size:0.8rem;',
    '  margin-top:0.65rem;',
    '  min-height:1.2em;',
    '  font-weight:600;',
    '}',
    '.auth-note {',
    '  font-size:0.72rem;',
    '  color:#C0AFA0;',
    '  margin-top:1.5rem;',
    '}',
    /* 認証成功アニメーション */
    '@keyframes authFadeOut {',
    '  to { opacity:0; transform:scale(1.04); }',
    '}',
    '.auth-success {',
    '  animation:authFadeOut 0.45s ease forwards;',
    '}',
    /* 入力エラーシェイク */
    '@keyframes authShake {',
    '  0%,100%{transform:translateX(0)}',
    '  20%{transform:translateX(-6px)}',
    '  40%{transform:translateX(6px)}',
    '  60%{transform:translateX(-4px)}',
    '  80%{transform:translateX(4px)}',
    '}',
    '.auth-shake { animation:authShake 0.4s ease; }',
  ].join('\n');

  document.head.appendChild(style);

  /* DOMが準備できてから挿入 */
  function mount() {
    document.body.style.overflow = 'hidden';
    document.body.insertBefore(overlay, document.body.firstChild);

    var form  = document.getElementById('auth-form');
    var input = document.getElementById('auth-input');
    var error = document.getElementById('auth-error');
    var field = overlay.querySelector('.auth-field');

    input.focus();

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var val = input.value;

      if (val === 'tensaikeita') {
        /* 認証成功 */
        sessionStorage.setItem(SESSION_KEY, '1');
        overlay.classList.add('auth-success');
        setTimeout(function () {
          document.body.style.overflow = '';
          overlay.remove();
        }, 460);
      } else {
        /* 認証失敗 */
        error.textContent = 'パスワードが違います。もう一度お試しください。';
        input.value = '';
        field.classList.remove('auth-shake');
        /* reflow で再トリガー */
        void field.offsetWidth;
        field.classList.add('auth-shake');
        input.focus();
        field.addEventListener('animationend', function () {
          field.classList.remove('auth-shake');
        }, { once: true });
      }
    });
  }

  if (document.body) {
    mount();
  } else {
    document.addEventListener('DOMContentLoaded', mount);
  }
})();

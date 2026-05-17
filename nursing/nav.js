/* ハンバーガーメニュー制御 */
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('.site-header');
    var nav    = document.querySelector('.site-nav');
    if (!header || !nav) return;

    // ボタン生成
    var btn = document.createElement('button');
    btn.className = 'nav-hamburger';
    btn.setAttribute('aria-label', 'メニューを開く');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '&#9776;'; // ☰
    header.insertBefore(btn, nav);

    // 開閉
    btn.addEventListener('click', function() {
      var open = nav.classList.toggle('open');
      btn.innerHTML = open ? '&#10005;' : '&#9776;';
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    });

    // リンクをタップしたら閉じる
    nav.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        nav.classList.remove('open');
        btn.innerHTML = '&#9776;';
        btn.setAttribute('aria-expanded', 'false');
      });
    });

    // 外側タップで閉じる
    document.addEventListener('click', function(e) {
      if (!header.contains(e.target)) {
        nav.classList.remove('open');
        btn.innerHTML = '&#9776;';
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();

(function(){
  // backdrop click → close
  document.addEventListener('click', function(e){
    if(e.target.tagName === 'DIALOG') e.target.close();
  });
  // ESC key → close all
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      document.querySelectorAll('dialog[open]').forEach(function(d){ d.close(); });
    }
  });
})();

function openPopup(id){
  var d = document.getElementById(id);
  if(d) d.showModal();
}

// ─── 出典リンク自動生成 ───────────────────────────────
// popup-source 要素のテキストをもとに公式サイトへのリンクを追加する
(function(){
  var SOURCE_MAP = [
    // 訪問看護療養費告示（医療保険）
    { re: /訪問看護療養費/,
      url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/hokenI.html',
      label: '厚労省 訪問看護ページ' },
    // 障害者総合支援法（法令全文 e-Gov）
    { re: /障害者の日常生活及び社会生活を総合的に支援するための法律|障害者総合支援法.*基準|指定障害福祉サービス.*人員.*設備.*運営/,
      url: 'https://laws.e-gov.go.jp/law/417AC0000000123',
      label: 'e-Gov 法令' },
    // 指定障害福祉サービス等報酬算定基準
    { re: /指定障害福祉サービス等に要する費用の額の算定|費用の額の算定.*障害|報酬.*算定.*基準/,
      url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/index.html',
      label: '厚労省 障害福祉サービス' },
    // 就労継続支援・工賃向上
    { re: /工賃向上計画|就労継続支援.*工賃/,
      url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/shurou.html',
      label: '厚労省 就労継続支援' },
    // 京都府
    { re: /京都府/,
      url: 'https://www.pref.kyoto.jp/shogai/',
      label: '京都府 障害者支援課' },
    // 厚生労働省（その他）
    { re: /厚生労働省/,
      url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/index.html',
      label: '厚労省 障害福祉サービス' },
  ];

  function initSources() {
    document.querySelectorAll('.popup-source').forEach(function(el) {
      if (el.dataset.linked) return;
      el.dataset.linked = '1';
      var text = el.textContent || '';
      for (var i = 0; i < SOURCE_MAP.length; i++) {
        if (SOURCE_MAP[i].re.test(text)) {
          var a = document.createElement('a');
          a.href = SOURCE_MAP[i].url;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.className = 'source-ext-link';
          a.title = SOURCE_MAP[i].label;
          a.textContent = '🔗 原文を確認';
          el.appendChild(a);
          break;
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSources);
  } else {
    initSources();
  }
})();

// ─── 公式ダウンロードボタン → 公式サイトリンク自動生成 ────────
// data-src-url 属性を持つ .dl-btn に 🌐 公式 ボタンを自動挿入する
(function(){
  function initOfficialLinks() {
    document.querySelectorAll('.dl-btn[data-src-url]').forEach(function(btn) {
      if (btn.dataset.extAdded) return;
      btn.dataset.extAdded = '1';
      var a = document.createElement('a');
      a.href = btn.dataset.srcUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'dl-btn ext-link';
      a.title = '公式サイトで確認';
      a.textContent = '🌐 公式';
      btn.insertAdjacentElement('afterend', a);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOfficialLinks);
  } else {
    initOfficialLinks();
  }
})();

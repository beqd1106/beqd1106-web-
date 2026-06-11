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
(function(){
  var SOURCE_MAP = [
    // 訪問看護療養費告示（近畿厚生局 令和6年度改定ページ）
    { re: /訪問看護療養費/,
      url: 'https://kouseikyoku.mhlw.go.jp/kinki/gyomu/gyomu/hoken_kikan/kango/r04_kijyun_00001.html',
      label: '近畿厚生局 訪問看護療養費' },
    // 障害者総合支援法（e-Gov 法令）
    { re: /障害者の日常生活及び社会生活を総合的に支援するための法律|障害者総合支援法.*基準|指定障害福祉サービス.*人員.*設備.*運営/,
      url: 'https://laws.e-gov.go.jp/law/417AC0000000123',
      label: 'e-Gov 障害者総合支援法' },
    // 就労継続支援・工賃向上計画（厚労省 就労支援ページ）
    { re: /工賃向上計画|就労継続支援.*工賃/,
      url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/service/shurou_00017.html',
      label: '厚労省 就労支援対策' },
    // 指定障害福祉サービス等報酬算定基準（令和6年度改定）
    { re: /指定障害福祉サービス等に要する費用の額の算定|費用の額の算定.*障害|報酬.*算定.*基準/,
      url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000202214_00009.html',
      label: '厚労省 令和6年度報酬改定' },
    // 京都府（加算届・指定申請）
    { re: /京都府/,
      url: 'https://www.pref.kyoto.jp/shogaishien/syogaifukushi.html',
      label: '京都府 障害福祉サービス' },
    // 厚生労働省（その他）
    { re: /厚生労働省/,
      url: 'https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000202214_00009.html',
      label: '厚労省 令和6年度報酬改定' },
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
          a.textContent = '原文を確認';
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
      a.textContent = '公式';
      btn.insertAdjacentElement('afterend', a);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOfficialLinks);
  } else {
    initOfficialLinks();
  }
})();

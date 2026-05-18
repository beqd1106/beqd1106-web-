/* ================================================================
   Service Worker — 障碍者福祉事業所 運営ガイド
   キャッシュファーストで主要リソースをオフライン対応する
================================================================ */
const CACHE_NAME = 'fukushi-guide-v1';

// オフラインでも使えるようにキャッシュするファイル
const PRECACHE = [
  '/nursing/',
  '/nursing/index.html',
  '/nursing/style.css',
  '/nursing/popup.js',
  '/nursing/nav.js',
  '/nursing/news.js',
  '/nursing/table-responsive.js',
  '/nursing/search.js',
  '/nursing/search-data.js',
  '/nursing/checklist.js',
  '/nursing/simulator.js',
  '/nursing/deadlines.js',
  '/nursing/01_法令・制度.html',
  '/nursing/02_必要書類.html',
  '/nursing/03_管理業務.html',
  '/nursing/04_京都府・手続き.html',
  '/nursing/05_請求業務.html',
  '/nursing/06_就労継続A型.html',
  '/nursing/07_就労継続B型.html',
  '/nursing/08_相談支援.html',
  '/nursing/09_監査対応.html',
  '/nursing/10_収入向上.html',
  '/nursing/11_年間スケジュール.html',
  '/nursing/12_QA.html',
  '/nursing/フォーマット/index.html',
];

// ── インストール: プレキャッシュ ───────────────────────────────
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE);
    }).catch(function () {
      // 一部のリソースが見つからなくてもインストールは続行
    })
  );
  self.skipWaiting();
});

// ── アクティベート: 古いキャッシュを削除 ───────────────────────
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// ── フェッチ: キャッシュファースト（HTMLはネットワーク優先）───
self.addEventListener('fetch', function (event) {
  var url = event.request.url;
  // 外部リソース（政府サイト等）はキャッシュしない
  if (!url.startsWith(self.location.origin)) return;

  var isHTML = event.request.destination === 'document';

  event.respondWith(
    isHTML
      // HTMLはネットワーク優先（最新コンテンツ）、失敗時はキャッシュ
      ? fetch(event.request).then(function (res) {
          var clone = res.clone();
          caches.open(CACHE_NAME).then(function (c) { c.put(event.request, clone); });
          return res;
        }).catch(function () {
          return caches.match(event.request);
        })
      // JS/CSS/画像はキャッシュ優先
      : caches.match(event.request).then(function (cached) {
          return cached || fetch(event.request).then(function (res) {
            var clone = res.clone();
            caches.open(CACHE_NAME).then(function (c) { c.put(event.request, clone); });
            return res;
          });
        })
  );
});

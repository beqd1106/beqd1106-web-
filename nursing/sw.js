/* ================================================================
   Service Worker — 障碍者福祉事業所 運営ガイド
   キャッシュファーストで主要リソースをオフライン対応する
================================================================ */
const CACHE_NAME = 'fukushi-guide-v5';

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
  '/nursing/13_障害介護サービス.html',
  '/nursing/14_AI作成支援.html',
  '/nursing/15_データ管理.html',
  '/nursing/16_実地指導チェックリスト.html',
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
  // news.js / deadlines.js は常に最新を取得（キャッシュしない）
  var isLiveData = /\/(news|deadlines)\.js/.test(url);

  event.respondWith(
    (isHTML || isLiveData)
      // HTML・動的JSはネットワーク優先、失敗時はキャッシュ
      ? fetch(event.request).then(function (res) {
          if (!isLiveData) {
            var clone = res.clone();
            caches.open(CACHE_NAME).then(function (c) { c.put(event.request, clone); });
          }
          return res;
        }).catch(function () {
          return caches.match(event.request);
        })
      // CSS/その他JSは キャッシュ優先
      : caches.match(event.request).then(function (cached) {
          return cached || fetch(event.request).then(function (res) {
            var clone = res.clone();
            caches.open(CACHE_NAME).then(function (c) { c.put(event.request, clone); });
            return res;
          });
        })
  );
});

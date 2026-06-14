/* ================================================================
   Service Worker — マーケティング資格学習ガイド
   Cache-first 戦略でオフライン対応
================================================================ */
var CACHE = 'marketing-v1.2';
var ASSETS = [
  './',
  './index.html',
  './study.html',
  './sns.html',
  './study_data.js',
  './progress.js',
  './auth.js',
  './manifest.json',
  './favicon.svg',
  './favicon.ico',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=M+PLUS+Rounded+1c:wght@400;700;800&display=swap',
  'https://unpkg.com/@phosphor-icons/web@2.1.1/src/duotone/style.css',
  'https://unpkg.com/@phosphor-icons/web@2.1.1/src/bold/style.css'
];

/* インストール: コアアセットをキャッシュ */
self.addEventListener('install', function(e){
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(cache){
      return cache.addAll(ASSETS.map(function(url){
        return new Request(url, {cache:'reload'});
      })).catch(function(){
        /* フォントなど外部リソースは失敗しても続行 */
        return cache.addAll(['./','./index.html','./study.html','./sns.html','./study_data.js','./progress.js','./auth.js']);
      });
    })
  );
});

/* アクティベート: 古いキャッシュ削除 */
self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k!==CACHE; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

/* フェッチ: キャッシュ優先・なければネットワーク */
self.addEventListener('fetch', function(e){
  if(e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(cached){
      if(cached) return cached;
      return fetch(e.request).then(function(response){
        if(!response || !response.ok || response.type==='opaque') return response;
        var clone = response.clone();
        caches.open(CACHE).then(function(cache){ cache.put(e.request, clone); });
        return response;
      }).catch(function(){
        /* オフライン時はトップページを返す */
        return caches.match('./index.html');
      });
    })
  );
});

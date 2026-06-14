const CACHE_NAME = 'pmi-learning-v5';

const FILES = [
  'index.html',
  'manifest.json',
  '学習_MECE.html',
  '学習_ロジックツリー.html',
  '学習_PDCA.html',
  '学習_3C分析.html',
  '学習_SWOT分析.html',
  '学習_財務基礎.html',
  '学習_PEST分析.html',
  '学習_バリューチェーン.html',
  '学習_5フォース.html',
  '学習_ADKAR.html',
  '学習_PMI基礎.html',
  '練習_MECE.html',
  '練習_ロジックツリー.html',
  '練習_PDCA.html',
  '練習_3C分析.html',
  '練習_SWOT分析.html',
  '練習_財務基礎.html',
  '練習_PEST分析.html',
  '練習_バリューチェーン.html',
  '練習_5フォース.html',
  '練習_ADKAR.html',
  '練習_PMI基礎.html',
  'PMIケーススタディ.html',
  'フレームワーク練習問題_ハブ.html',
  '成長ロードマップ_新入社員向け.html',
  '事業戦略_解説_当社.html'
];

// 1ファイル失敗しても他のキャッシュが止まらないようにallSettledを使用
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(FILES.map(f => cache.add(f)))
    )
  );
  self.skipWaiting();
});

// 古いキャッシュを全て削除
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// ネットワーク優先（キャッシュはフォールバック）
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

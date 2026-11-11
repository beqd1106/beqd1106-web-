// 資格note Web のサービスワーカー
// 画面（HTML/JS/CSS）は「まずネット、だめならキャッシュ」、問題データと音声は「まずキャッシュ」。
// データのURLには版数(?v=)が付くので、更新すると自然に新しいものを取りにいく。
const SHELL = "shikakunote-shell-v1";
const DATA = "shikakunote-data-v1";
self.addEventListener("install", (e) => { self.skipWaiting(); });
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith("shikakunote-") && k !== SHELL && k !== DATA).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  // 音声はSafariが範囲指定(Range)で取りにくるので、サービスワーカーを通さない
  if (url.pathname.includes("/audio/") && url.pathname.endsWith(".mp3")) return;
  const isData = url.pathname.includes("/data/") || url.pathname.endsWith("/audio/terms/index.json");
  if (isData) {
    e.respondWith(caches.open(DATA).then(async (c) => {
      const hit = await c.match(req); if (hit) return hit;
      const res = await fetch(req);
      if (res.ok && res.status === 200) c.put(req, res.clone());
      return res;
    }));
  } else {
    e.respondWith(fetch(req).then((res) => { if (res.ok) caches.open(SHELL).then((c) => c.put(req, res.clone())); return res; })
      .catch(() => caches.match(req).then((r) => r || caches.match("./"))));
  }
});

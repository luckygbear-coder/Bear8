// sw.js － 熊熊卜卦 PWA Service Worker（GitHub Pages：/Bear8/）

// ⚠️ 記得每次有大修改就改一下版本號（v1 → v2 → v3…）
// 這樣舊的錯誤快取才會被清掉
const CACHE_VERSION = "bear-iching-v1";
const CACHE_NAME = `bear-iching-cache-${CACHE_VERSION}`;

// 需要離線快取的檔案（全部加上 /Bear8/）
const ASSETS_TO_CACHE = [
  "/Bear8/",
  "/Bear8/index.html",
  "/Bear8/style.css",
  "/Bear8/script.js",
  "/Bear8/manifest.json",
  "/Bear8/icons/icon-192.png",
  "/Bear8/icons/icon-512.png"
];

// 安裝階段：預先把重要檔案放進 cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );

  // 讓新版 SW 安裝完就立刻接管（不用等重開）
  self.skipWaiting();
});

// 啟用階段：清掉舊版 cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key.startsWith("bear-iching-cache-") && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  // 讓所有 client 立刻使用這個新版 SW
  return self.clients.claim();
});

// 讀取請求：先看 cache，有就用；沒有再去網路抓
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // 只處理 GET 請求
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // 👍 有快取的就直接回應（速度最快）
        return cachedResponse;
      }

      // 沒有快取就去網路抓，順便把成功的結果放進 cache
      return fetch(request)
        .then((networkResponse) => {
          // 只快取 200 正常的回應
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });

          return networkResponse;
        })
        .catch(() => {
          // 如果連網路都失敗（完全離線），可以在這裡做 fallback
          // 目前先什麼都不做，讓瀏覽器自己顯示錯誤畫面
          return new Response(
            "目前離線中，暫時無法載入這個頁面。\n（可以先回到熊熊卦首頁再試一次）",
            {
              status: 503,
              headers: { "Content-Type": "text/plain; charset=utf-8" }
            }
          );
        });
    })
  );
});
// sw.js 可以先留白或寫很簡單，重點是有檔案

self.addEventListener("install", (event) => {
  // 之後如果想做快取，可以再補
  console.log("Service Worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});

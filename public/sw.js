// 版本号 更新可强制刷新缓存
const CACHE_VERSION = 'v20221216';
const CACHE_STALE = 'cs-' + CACHE_VERSION
const CACHE_FISRT = 'cf-' + CACHE_VERSION


function clearCache() {
  // 与当前版本不一致 清除缓存
  return caches.keys().then((keys) => {
    keys.forEach((key) => {
      console.log('cache_key', key)
      if (!key.includes(CACHE_VERSION)) {
        caches.delete(key);
      }
    });
  });
}

self.addEventListener('install', function (event) {
  event.waitUntil(self.skipWaiting);
});

self.addEventListener('activate', function (event) {
  // 在 activate 事件回调被调用时，它把即将被激活的 worker 线程状态延迟为 activating 状态，直到传递的 Promise 被成功地 resolve。
  // 清除缓存
  event.waitUntil(Promise.all([clearCache(), self.clients.claim()]));
});

self.addEventListener('fetch', function (event) {
  const { url, method } = event.request
  // 过滤掉post请求
  if (method === 'POST' || !url.includes('http')) return
  // 处理html, js, css 
  const reg1 =  /\.(js|mjs|jsx|ts|tsx|css|html)$/
  if (reg1.test(url)) {
    event.respondWith(caches.open(CACHE_STALE).then(() => (
      caches.match(url).then(res => stateWhileRevalidateHandler(res, event, url))
    )))
    return
  }
  // 处理图片
  const reg2 =  /\.(svg|png|font|jpeg|jpg)$/
  if (reg2.test(url)) {
    event.respondWith(caches.open(CACHE_FISRT).then(() => (
      caches.match(url).then(res => cacheFirstHandler(res, event, url))
    )))
    return
  }
  // 其他请求直接返回
  event.respondWith(
    fetch(event.request).then(res => res).catch(err => err)
  );
});

// 缓存策略
// 先用缓存 同时更新缓存（频繁更换的资源 如html js css）
function stateWhileRevalidateHandler(cacheResponse, event, name) {
  const fetchResponse = fetch(event.request).then(res => (
    caches.open(CACHE_STALE).then(cache => {
      cache.put(name, res.clone())
      return res;
    }).catch(() => {
      return cacheResponse
    })
  ))
  return cacheResponse || fetchResponse
}
// 缓存优先策略
// 有缓存，就直接使用
function cacheFirstHandler(cacheResponse, event, name) {
  if (cacheResponse) return cacheResponse;
  
  const fetchResponse = fetch(event.request).then(res => (
    caches.open(CACHE_FISRT).then(cache => {
      cache.put(name, res.clone())
      return res;
    }).catch(() => {
      return cacheResponse
    })
  ))
  return fetchResponse
}


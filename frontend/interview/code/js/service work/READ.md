Service worker 是一个注册在指定源和路径下的事件驱动 worker。它采用 JavaScript 控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。Service Worker 可以使你的应用先访问本地缓存资源，包括 js、css、png、json 等多种静态资源。

1. 独立于主 JavaScript 线程（worker, 这就意味着它的运行丝毫不会影响我们主进程的加载性能）
2. 设计完全异步,大量使用 Promise（因为通常 Service Worker 通常会等待响应后继续，Promise 再合适不过了）
3. 不能访问 DOM，不能使用 XHR 和 localStorage
4. Service Worker 只能由 HTTPS 承载(出于安全考虑)

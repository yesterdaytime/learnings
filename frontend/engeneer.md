# 性能优化

## 首屏优化

什么原因导致首屏慢？

-   网络延迟

    -   cdn 用户节点就近原则
    -   preload
    -   prerender

-   资源大小

    -   分包 chunk
    -   懒加载
    -   公共资源 vender
    -   缓存

        -   强缓存

            -   Expire
            -   Cache-Control

        -   协商缓存

            -   Last-Modified
            -   If-Modified-Since
            -   Etag
            -   If-None-Math）

        -   策略缓存

            -   Service-worker

    -   局部 SSR (广告页，落地页，营销活动页)
    -   PWA

-   最终方案： SSR

## 指标衡量 (Lighthouse)

-   FP (First Print) / 首次绘制
-   FCP (First Contentful Print) / 首次内容绘制

用 Chrome -> Lighthouse -> Performmance

-   FMP (First Meaningful Print) / 首次有效绘制
-   LCP (Largest Contentful Print) / 最大内容绘制

FMP 一般用 MutationObserver

-   性能采集

    -   Performance
    -   MutationObserver

-   用户采集

    -   无痕埋点
    -   手动埋点
    -   可视化埋点

-   异常采集

    -   React ErrorBoundary
    -   异常捕获

SSR 有

Best WebSite (Framer)

-   可交互时间（TTI Time to Interact）,
-   TBT(从 FCP -> 可交互，中间的事件 Total Blocking Time)

指标衡量

    - webvital
    - rrweb 写性能采集截屏或者录像

## 具体优化细节

-   优化图片：推荐 webP 格式，不要太大的图片（图片上传控制 size 200 \* 200）

-   组件按需加载： React Suspense + React.lazy
-   延迟加载：滚动加载，可视区域渲染
-   tree-shaking: 通过代码编写的方式去约束，tree-shaking 需要什么条件？ esm（模块化-amd, cmd， 宁， commonjs, esm) rollup parcel rspack, esbuild, swc.
-   精简三方库： antd, mantine， mui， nextui, arco UI， 库要支持按需导入， babel-plugin-import
-   国际化文件，要移除
-   缓存
-   字体压缩
-   SSR(Server side render) SSG(Server side Generate)

## 具体实现的进阶

-   预加载： preload

```html
<link rel="preload" href="xxx.js" as="script" />
```

-   加载关键 css

    什么叫关键 CSS, 怎么提取关键 CSS

-   HTTP/2 Server Push

-   延迟加载

```html
<script defer></script>
<script async></script>
```

-   预渲染技术

Prerender

webpack Prerender 方案

@prerender/webpack-plugin + Puppetter

### SSR

React next

Vue Nuxt

## 分析工具

webpack-bundle-analyzer
vit-bundle-analyzer

## 低代码无聊体系

插件化
babel webpack vite

redux axios 面向切面编程（AOP) 中间件机制

## 远程插件

-   requirejs
-   systemjs
-   react-loadable
-   module-federation runtime

微前端： single-spa, qiankun, macroapp wujie

## WebAssemble

## Skia

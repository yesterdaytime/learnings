## Accessibility

### Tool

1. Axe-Core

    axe.run(?node, ?config)

2. @axe-core/cli

    axe url

3. axe devTools

    chrome extends

4. cypress-axe

    和 cypress case 类似，可以将 visit 和 checkA11y 放在一个 case

5. LightHouse

    google extends

    不只是 accessiblity，也可以分析 performance, SEO, Best Practices

6. Pa11y

    pa11y https://example.com --runner axe

# Reactive Programming

    1. Rxjs可以很容易实现reactive progreamming, subject控制event和更新值。将所有的function 解耦，
    2. 减少单个文件代码量，同时让代码可读性变的更好
    3. 尽量用async 在html取数据，避免大量的参数声明，增加代码美观

    js lib:
        ngQuery: 缓存 response observable, 在 update 和 delete的时候删除
        ComponentStore： 整合的ngrx，通过extends, 可以使用 ngrx， 同时代码从统一的地方分散到Component


    angular signal

        可以不用async,同时实现reactive programming，类似react的 setState()，自带set 方法，自身也是一个方法，用来取值

# Angular and Typescript

    [class] vs [ngClass]
        [class]: 不支持组合的class: {'a b c': true}
        [ngClass]: 支持所有的情况

    [id]="undefined" => id="undefined"
    [attr.id]="undefined" => not have id attribute

# Testing

    1. rxjs scan

        rxjs page reset and next
        scan function

    2. type in typescript

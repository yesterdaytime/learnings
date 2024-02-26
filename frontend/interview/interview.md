# Css

-   盒模型

    在 html 页面中，所有元素都可以看做盒子，有边， 内边距，外边距，内容组成。

    border, padding, margin, content

-   css 选择器的优先级

    !important > style > id > class > extends

-   px vs rem

        px： 像素
        rem: 相对于html的font-size做的相对大小， html font-size可以是 px 或 %， % 是 16px * %

    11

-   重绘和重排的区别

    重排：布局引擎会根据 css 计算出元素在页面中的位置和大小
    重绘：浏览器根据 css 样式的变化，对元素的样式进行重新绘制
    ![浏览器渲染机制](../image/browser%20load.png)

-   水平垂直居中

    position + margin | transform
    flex
    grid
    table

-   css 哪些属性可以继承

    1. 字体
    2. 文本属性
    3. 元素可见性
    4. 表格布局
    5. 列表属性

-   scss

    1. 变量

        ```
         $highlight-color: #F90;

         div {
            color: $highlight-color;
         }
        ```

    2. 嵌套
       嵌套分为属性嵌套和 selector 嵌套

# JS

-   js 组成

    1. js 语法 ECMA script
    2. DOM 对象模型
    3. 浏览器对象模型 BOM

-   js 内置对象

    1. 基本类型
    2. Promise
    3. Math
    4. RegExp

-   操作数组方法

    不改变原数组的：

    1. map
    2. filter
    3. slice

    改变原数组：

    1. splice
    2. sort
    3. reverse
    4. push
    5. pop
    6. unshift
    7. shift

    others:

    1. reduce
    2. join
    3. concat

-   js 类型检测

    1. typeof 检测基础类型，数组返回的是 Object
    2. instanceof 检测除基础类型外的所有类型
    3. constructor 检测所有类型
    4. Object.prototype.toString.call() 用类的 toString 去判断

-   闭包的特点

    闭包是函数嵌套另一个函数， 并且内部函数被外部函数返回

    优点：可以重复利用变量，并且不会污染全局。变量一直保存在内存中，不会被回收
    缺点：闭包太多会导致内存消耗过大，性能下降，内存泄漏
    应用场景： 防抖， 节流，避免全局参数污染

-   js 垃圾回收机制

    1. 标记清除： 在 js 中，由 global 往下根据引用查找标记，未被标记的会视为可回收的变量资源，执行回收操作.
    2. 引用计数： 声明一个变量，将这个变量赋值给另一个引用，次用+1，当引用变了，不再是当前变量，次数-1，整体运行下来，次数为 0 的删除

-   防抖(debounce)，节流(throttle)

    debounce：最后一次变化 n 秒后，触发 function, 任何变化都会触发重新计时
    thtottle: 触发 function 之后的 n 秒内，不会再次触发 function.

-   内存泄漏

    内存泄漏是 js 已经分配资源的对象长时间得不到或无法释放， 造成长期占用内存的现象。
    内存泄漏浪费大量内存，长时间会导致系统运行缓慢，甚至崩溃

    内存泄漏的因素：

    1. 循环引用
    2. 全局变量
    3. 闭包导致的变量脱离当前函数的上下文，和闭包内相互依赖
    4. setTimeout/setInterval 未被清理
    5. dom 的绑定事件在 dom 清理后，未及时清理

-   事件委托

    根据事件冒泡的机制，将子元素的事件绑定到父元素来实现,当子元素很多的时候，绑定到子元素上会很不方便，可以用事件委托
    对事件冒泡进行阻止的元素无法用事件委托，阻止方法： event.stopPropagation();
    提高性能，减少绑定

-   基本数据类型和引用数据类型的区别

    基本数据类型：

        1. 保存在栈中

    引用数据类型:

        1. 保存在队内，栈中是内存地址
        2. 两个引用值指向同一个地址，其中一个值变了，所有地方的值都会变

-   js 原型和原型链

    1. 原型，所有的函数默认都有一个“prototype”这样公有且不可枚举的属性，它会指向另一个对象，这个对象就是原型。
    2. 原型链，当访问对象的属性或方法时，首先对象会从自身去找，找不到就会往原型中去找，也就是它构造函数的“prototype”中，如果原型中找不到，即构造函数中也没有该属性，就会往原型后面的原型上去找，这样就形成了链式的结构，称为原型链。

-   js new 对象, 对象也是 function 的一种

    1. 创建一个 null 的 Object
    2. 将新对象的 prototype 赋值给新创建的对象
    3. 将参数赋值给新的对象
    4. 根据基础类型还是引用类型， 返回值或者新创建的对象

    ```
        export function newFun(fn: any, ...args) {
            let myObj = {};
            myObj.__proto__ = fn.prototype;
            let result = fn.apply(myObj, args);

            return result instanceof Object ? result : myObj;
        }
    ```

-   js 继承机制

    1. 原型链继承

        可以继承方法和参数，但不能传参. 对象实例共享所有父类参数，一个改变，之后的都会改变

        ```
            Child.prototype = new Parent();
        ```

    2. 构造函数继承

        可以传参，但不能继承 function

        ```
            Parent.call(this, ...args);
        ```

    3. 组合继承

        ```
            function Child(...args) {
                Parent.call(this, ...args);
            }

            Child.prototype = new Parent();
        ```

        可以实现传参，也能用父类的方法， 但父类会调用两次， 在 call 和 prototype 中各一次

    4. extends

-   this 指向问题

    this 基本指向函数的上一级, 上一级如果是 global,则指向 window.
    箭头函数本身没有 this，它指向上层 this, 如果上层没有，继续向上找。
    new, apply, call，bind 都可以改变 this 指向，在编程中，调用第三库，可能会遇到

-   箭头函数和普通函数的区别

    箭头函数某些情况下可以省略{}，return, 可以将 code 写在同一行，用在数组操作中更简洁直观

    可以把箭头函数整体看成是参数，但具有函数的基本特性

    区别

    箭头函数：

    1. 不能用 arguments
    2. 没有 prototype
    3. 不能使用 new
    4. 能处理普通函数无法访问的 this，不如数组循环中访问 this.

-   script 标签的 defer 和 async 作用和不同

    green: html 解析
    blue: script file load
    red: script 执行
    grey: 阻塞

    1. script loaded

        ![script loaded](./image/script%20load.png)

    2. script async loaded

        ![script async loaded](./image/script%20async%20load.png)

    3. script defer loaded

        ![script defer loaded](./image/script%20defer%20load.png)

-   es6 或者说 es2015 新增了哪些特性

    1. 块级作用域(const let)

        1. 不存在变量提升，即不能在声明前使用它， var 可以，只是取到的是 undefined
        2. 不能在同一作用域重复声明
        3. 在全局声明中，var 创建的参数是在 window 对象上的， let 声明的变量和 window 对象没关系
        4. 作用域是块级的，出了当前块，就拿到的是 undefined

    2. class
    3. symbol

        Symbol.iterator 可以使 class 变成可以迭代的，从而使 class 可以用迭代,当然，你可以用 list 来存数据.

        ```
        [Symbol.iterator]() {
            let index = 0;
            const list = this.list;
            return {
                next: () => ({value: list[index++], done: index>list.length}),
            }
        }
        ```

        Symbol.toStringTag 可以定制 toString 输出信息，和 toString 不同, 如果有 toString, 这个就不需要了

        ```
            get [Symbol.toStringTag]() {
                return "Test";
            }

            new Class().toString() => [object Test]
        ```

        Symbol.toPrimitive 根据需要的值，可以定制转化结果.

        ```
            class MyDateTime {
                constructor(year, month, day, hour = 0, minute = 0, second = 0) {
                    this._datetime = new Date(year, month - 1, day, hour, minute, second);
                }
                [Symbol.toPrimitive](hint) {
                    switch (hint) {
                        case "number":
                            return this._datetime.getTime();
                        case "string":
                            return this._datetime.toLocaleString();
                        default:
                            return this._datetime.toString();
                    }
                }
            }

            console.log(myDate); // 输出：Sat Apr 08 2023 15:30:00 GMT+0800 (中国标准时间)
            console.log(myDate + 10000); // 输出：1699950200000
            console.log(`${myDate}`); // 输出："2023/4/8 下午3:30:00"
        ```

        Symbol.replace | Symbol.match | Symbol.split

        当你需要特殊处理的时候，可以用这三个声明 customer RegExp, 格式为 { [Symbol.replace | Symbol.match | Symbol.split]: customerFn }

    4. 函数的参数默认值
    5. import and export
    6. set map
    7. generator

        yieled 控制输入，每次运行只输入一个

    8. arrow function
    9. promise

        race: 任何一个 promise 返回都返回，无论是 resolved or rejected
        all: 最后一个返回，返回

    10. 结构赋值

        ```
            const { a, b, c: { d }} = test;
        ```

-   js promise, setTimeout 调用顺序的问题

    js 有两个任务队列，一个存 promise（微任务队列）, 一个存 setTimeout 事件（宏任务队列）。当执行 js code 的时候，会顺序执行，遇到 promise 会把他存到一个任务序列中，遇到 setTime，存到另一个任务队列，code 顺序执行完了，就会执行 promise 的队列中的任务，然后检查 setTime 所在的队列，然后根据时间，来执行
    如果中途需要等待 promise 执行完成， 可以用 async await 来执行
    需要注意， async function 内部等待，外部如果没有 await 不会等待, 在顺序执行中，遇到 await 都会阻塞

-   call, apply, bind 区别

    三种方法： 第一个参数都是 this, bind 只有一个参数

    call 和 apply 出了传参不同，其他都相同， call 传递参数， apply 传递参数列表

    bind 之后，还是函数

-   如何实现一个深拷贝

    1. ... 扩展运算符

    2. JSON.stringify

    3. 递归

-   js 事件循环

    js 是单线程的，js 先执行同步任务，遇到 promise 和 setTimeout， 把他们分别加入到微任务和宏任务队列中，然后在同步代码执行完成后，执行微任务队列，然后执行宏任务队列。所有的执行完成后，如果还存在同步任务，再循环执行同步任务， 微任务，宏任务，

-   ajax 是什么， 怎么实现的

    通过 AJAX 可以在浏览器中向服务器发送异步请求，最大的优势：无刷新获取数据

    当用 get 的时候，params 放在 link 中

    1. 创建 XMLHttpRequest 对象
    2. 设置请求信息
    3. 发送请求
    4. 接收响应

    ```
        let xhr = new XMLHttpRequest();

        xhr.open(method, url);
        //可以设置请求头，一般不设置
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(body); //get 请求不传 body 参数，只有 post 请求使用
        //xhr.responseXML 接收 xml 格式的响应数据
        //xhr.responseText 接收文本格式的响应数据
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var text = xhr.responseText;
                console.log(text);
            }
        };
    ```

-   get VS post

    get 会一次性把 header 和 data 发出去，post 会先发 header 然后发送 data， get 只需要发一个 tcp 包， post 需要两个 tcp 包

    1. get 获取数据，post 创建修改数据
    2. get 参数在 link 上， post 在 body 中
    3. get 退回没啥影响，post 退回会重新发送
    4. get 会缓存，post 不会
    5. get 历史能找到， post 找不到
    6. get 支持 url 编码， post 支持各种编码

-   Promise 内部原理，优缺点

    Promise 是封装了一个异步操作，并返回成功与失败结果的类

    回调地狱： 嵌套达 3 层及以上，使代码可读性严重下降的回调函数，

    Promise 主要解决异步回调地狱的问题

    pending -> succuss. pending -> failure

    promise 原理:

        构造一个promise实例, 需要两个形参，分别是resolve 和 rejected 函数. 基本上第一个步不用声明rejected， 因为没有前一步，就没有error
        then 方法传参和promise一样， 根据前一步结果，返回两个函数中的任何一个

-   promise vs async await

    1. promise 是 es6, async await 是 es7
    2. async await 是基于 promise 实现的，都是非阻塞性的
    3. 都是处理异步请求的

    优缺点：

    1. Promise 是返回对象， 需要用 then catch 捕获结果和异常，容易造成代码层叠，不好维护，async await 让代码看起来像顺序执行一样， 可以用 try catch 捕获异常
    2. async 可以拿到结果，后面的代码直接用， promise 后面的代码想用 promise 的返回，只能放在 then 里面

-   浏览器存储方式

    1. cookies

        1. H5 前的标准存储方式
        2. 兼容性好
        3. 存储量小，资源浪费， 使用麻烦

    2. localStorage

        1. 操作方便，永久存储， 可以跨页面取数据，但隐私模式下读不到非隐私下的 localStorage, 不可被爬虫

    3. sessionStorage

        1. 会话级别的存储方式，只在当前页面可以找到，跨页面无法读取

    4. indexDB

        相当于在前端创建一个新的简单的数据库。作为了解，不做要求

        1. [code](./code/indexdb.js)

-   token 是存在 localStorage 还是 cookies

    1. 存 localStorage 中， token 记录加密的登录信息，可以实现跨页面的登录校验，不过在 header 中需要加上，以备 backend 验证， 但是容易被 xss 攻击

    xss: XSS 攻击通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是 JavaScript，但实际上也可以包括 Java、 VBScript、ActiveX、 Flash 或者甚至是普通的 HTML。攻击成功后，攻击者可能得到包括但不限于更高的权限（如执行一些操作）、私密网页内容、会话和 cookie 等各种内容。

    2. 存 cookie 中，自动发送，不能跨域， 容易被 csrf 攻击

    CSRF（跨站请求伪造）是一种网络攻击方式，它允许攻击者在未经授权的情况下，通过诱导用户访问第三方网站并利用这些网站的接口功能，模拟合法用户的行为并向受害网站发出请求。由于这些请求看起来像是来自受信任的用户，因此在许多情况下，它们可能会成功执行而不引起怀疑。CSRF 攻击可能涉及以下几种情况：

    GET 类型的 CSRF 攻击：在这种攻击中，攻击者可能在网页上嵌入恶意图片，当用户访问该网页时，恶意图片会触发一个 HTTP GET 请求，从而可能导致未经授权的操作。
    POST 类型的 CSRF 攻击：攻击者构造一个表单，将其隐藏起来，并在用户访问页面时自动填写并提交这个表单。
    链接类型的 CSRF 攻击：攻击者创建一个包含恶意链接的 HTML 文档，当用户点击该链接时，会导致相同的未经授权的操作。
    CSRF 攻击的危险在于，攻击者可以冒充合法用户执行各种操作，如发送垃圾邮件、获取敏感信息、执行财务交易等。由于 CSRF 攻击利用的是 Web 应用程序的身份验证机制，而不是直接攻击服务器上的数据，因此它们相对不易检测和防御。CSRF 曾被评为网络安全领域的一大隐患，并且在实际中被广泛利用

-   token 的登录流程

    1. 客户端用登录用户名密码登录
    2. 服务端验证 user 和 password
    3. 验证成功， 服务端会签发一个 token，发送会客户端
    4. 客户端收到 token，存储起来
    5. 客户端每次请求都携带 token
    6. 服务器收到 token，验证通过，返回数据

-   页面渲染过程

    1. DNS 解析
    2. 建立 tcp 连接
    3. 发送 http 请求
    4. 服务器处理请求
    5. 渲染页面

        浏览器获取 html css, 然后解析成 dom 树，将 css 和 dom 树合并成渲染树，并布局，将布局后的渲染树节点渲染到浏览器中

    6. 断开 tcp 连接

-   DOM 树和渲染树有什么区别

    DOM 树和 HTML 一一对应的， 包含 header 和隐藏标签， 渲染树不包含 header 和隐藏标签

-   精灵图 vs base64

    精灵图： 为了减少请求次数，将小的图标整合到一张图中，通过移动显示局部来达到显示图标的目的
    base64：把原本的二进制图片变成 64 位字符的编码方式，存在编码后的字符比原图大的情况

    base64 是会和 html css 一起加载到页面中的，减少请求，跨域问题，但有的浏览器版本较低，可能不支持

-   svg

    基于 xml 格式的的图像格式，可以缩放的矢量图，本质上是图像路径的描述文本，体积小.

    1. `<svg></svg>`
    2. `<img src="">`
    3. 转成 base64 显示

-   jwt

    全称： json web token

    通过 json 形式作为 web 应用中的令牌， 可以在各方安全的作为 json 对象传输，信息传输，授权等

    jwt 认证流程：

    1. 用户登录 user password
    2. 后端对密码进行验证，将用户信息进行 base64 编码后，签名，并加入过期时间，返回前端
    3. 前端请求加在 header 中
    4. BE 验证 签名，过期时间等，通过直接返回结果

-   npm 底层环境是什么

    node package management.

    npm 组成： npm 网站（仓库）, 注册表， 命令行工具

-   跨域问题解决方案

    1. nginx 跨域配置
    2. Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Headers 配置
    3. JSONP： 创建 script 标签来实现的

-   浏览器缓存策略

    1. 本地缓存（强缓存）

        不发送请求， 直接使用缓存内容： js css images

    2. 协商缓存（弱缓存）

        需要发送请求，根据判断来决定是否缓存，基本是请求条件

    强缓存触发条件：

        Http1.0 时间戳响应头
        Http1.1 Cache-Control 响应标头

    协商缓存触发条件

        Http1.0 请求头： if-modified-since, 响应头： last-modified
        Http1.1 请求头： if-none-match, 响应头： ETag

-   同源策略

    https:// baidu.com: 80

    url link 的协议，域名，端口号相同

    跨域的三个标签： img script link

-   JSON

    纯字符串的数据， key - value 键值对组成，适合在网络中传输

    使用场景： 数据传输， jwt token, 配置文件， 定义接口

-   无感登录

    1. 项目中基本定义两个 token， token 和 refreshToken, token 过期后，自动用 refreshToken 来获取 token， refreshToken 基本长过 token 的过期时间
    2. 定时器重新刷新 token
    3. api 返回 401，刷新 token

-   大文件上传

    主要有分块上传 和 断点续传

    1. RandomAccessFile: Java 中的一个类，可以实现对文件的随机访问，适用于断点续传功能的实现。
    2. HttpURLConnection： Java 中用于处理 HTTP 请求的类，可以通过设置请求头部信息实现下载文件的断点续传。
    3. Apache Commons IO： 一个常用的开源工具库，提供了许多与 IO 相关的操作，例如读写文件、复制文件等。
    4. Java NIO（New IO）： 一种非阻塞 IO 的编程方式，可以提高文件分片的效率。

    断点续传

    ```
        import java.io.IOException;
        import java.io.InputStream;
        import java.io.RandomAccessFile;
        import java.net.HttpURLConnection;
        import java.net.URL;

        public class ResumeDownload {
            private static final String FILE_URL = "http://example.com/file.txt";
            private static final String SAVE_PATH = "/path/to/save/file.txt";
            private static final String TEMP_PATH = "/path/to/save/file.txt.tmp";

            public static void main(String[] args) {
                try {
                    URL url = new URL(FILE_URL);

                    HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                    connection.setRequestMethod("GET");
                    connection.setConnectTimeout(5000);
                    connection.setReadTimeout(5000);

                    long startPosition = 0;
                    if (connection.getResponseCode() == HttpURLConnection.HTTP_PARTIAL) {
                        startPosition = connection.getHeaderFieldLong("Range", 0);
                    }

                    RandomAccessFile file = new RandomAccessFile(SAVE_PATH, "rw");
                    file.seek(startPosition);

                    InputStream inputStream = connection.getInputStream();
                    byte[] buffer = new byte[1024];
                    int length;
                    while ((length = inputStream.read(buffer)) != -1) {
                        file.write(buffer, 0, length);
                    }

                    file.close();
                    connection.disconnect();

                    System.out.println("Download completed.");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    ```

    分片上传

    ```
    import java.io.IOException;
    import java.io.RandomAccessFile;

    public class FileSplit {
        private static final String FILE_PATH = "/path/to/source/file.txt";
        private static final String SAVE_PATH = "/path/to/save";

        public static void main(String[] args) {
            try {
                RandomAccessFile file = new RandomAccessFile(FILE_PATH, "r");

                byte[] buffer = new byte[1024 * 1024]; // 每个文件块的大小为1MB
                int index = 0;
                int count;
                while ((count = file.read(buffer)) != -1) {
                    String chunkName = String.format("%s/file_%d", SAVE_PATH, index++);

                    RandomAccessFile chunk = new RandomAccessFile(chunkName, "rw");
                    chunk.write(buffer, 0, count);
                    chunk.close();
                }

                file.close();

                System.out.println("Split completed.");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    ```

-   webpack 打包和不打包的区别

    1. 减小文件大小，提高运行效率
    2. 转化一些不识别的语法，比如 ts，angular 之类的架构语言

-   webpack 怎么打包， babel 是做什么的

    1. webpack 将 css， img, js 当做一个模块，用 import/require 导入
    2. 找到入口文件，将相关联的文件打包到一起
    3. 将打包到一起的文件分成小的文件，异步按需加载文件
    4. 如果一个文件被多个地方引用，只会生成有一个文件
    5. 如果文件没有引入或调用，就不会打包
    6. 对于多个入口文件，引入相同的代码，可用插件把他们抽离到相同的文件里面

    babel 用以解析 ts 等语言，将他们变成基本的 js html css

-   git 操作

    ![git 网图](./image/git.svg)

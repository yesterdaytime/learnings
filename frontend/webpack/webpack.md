# 入口(entry)

```js
module.exports = {
    entry: './path/to/my/entry/file.js',
};
```

# 输出(output)

```js
const path = require('path');

module.exports = {
    entry: './path/to/my/entry/file.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-first-webpack.bundle.js',
    },
};
```

# loader

loader分两种方式：- 配置方式 - 内联方式

### 配置方式

loader 采用从下到上的顺序加载运行，比如在操作sass的时候，会先由`sass-loader`转化成css,由`css-loader`操作生成模块，最后由style-loader去重优化

```js
const path = require('path');

module.exports = {
    output: {
        filename: 'my-first-webpack.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    { loader: 'sass-loader' },
                ],
            },
        ],
    },
};
```

### 内联方式 (通常本地测试用)

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

# 插件(plugin)

    - HtmlWebpackPlugin

# modules

    modules 根据规则匹配文件，然后加入到文件解析中，从下到上的顺序来的

# 模式(mode)

    - product
    - development
    - none

# 浏览器兼容性(browser compatibility)

# 环境(environment)

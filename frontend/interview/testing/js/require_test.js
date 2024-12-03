/// <reference lib="es2015"/>

console.log(this === module.exports, this === exports); // true true

this.a = 12;
exports.b = 12;

// 这里的赋值改变了exports本身的行为，在require中是拿不到的，exports.b = 12 会被添加到module.exports中,
// 这个声明之后的exports都不会加入到module.exports中
exports = {
    c: 12,
};
// 因为之前已经重新定义了exports,质量拿到的是之前重新定义的exports对象，和系统内的 exports是不一样的
exports.h = 12;

module.exports.g = 12;

// 对里面的参数进行重新分配值，会是之前所有可用值的叠加
// module.exports.d = 12;

// module.exports = {
//     d: 12,
// };

exports.e = 12;

this.f = 12;

// require实现伪代码
function require(modulePath) {
    const cache = {};
    let moduleId = getModuleId(modulePath);

    if (cache[moduleId]) {
        return cache[moduleId];
    }

    function _require(exports, require, module, __filename, __dirname) {
        // change module.exports 值
    }

    let module = {
        exports: {},
    };

    let exports = module.exports;

    let __filename = moduleId;

    let __dirname = getDirname(__filename);

    _require.call(exports, exports, module, __filename, __dirname);

    cache[moduleId] = module.exports;

    return module.exports;
}

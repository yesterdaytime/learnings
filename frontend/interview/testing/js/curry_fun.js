// curry 无法识别超出func的参数的值，同时无法处理最后一个有默认值或可以为null的情况

const curry = require('lodash').curry;

// 柯里化的基础实现
function curryFn(fn) {
    return function curried(...args) {
        // 判断当前已经提供的参数数量是否足够原始函数执行
        if (args.length >= fn.length) {
            // 如果足够，则直接执行原始函数
            return fn.apply(this, args);
        } else {
            // 如果不够，返回一个接受剩余参数的函数
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}
const add = (a, b, ...args) => {
    return a + b + args.reduce((pre, curr) => pre + curr, 0);
};

const curried = curryFn(add);

console.log(curried(1)(2));

const curried1 = curry(add);

console.log(curried1(1)(2));

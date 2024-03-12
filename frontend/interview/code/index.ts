// export const debounce = (fn: () => any, time: number = 10) => {
//     let timer: number | null = null;

//     return () => {
//         if (timer) clearTimeout(timer);

//         timer = setTimeout(() => {
//             fn();
//             timer = null;
//         }, time);
//     };
// };

// export const throttle = (fn: () => any, time: number = 10) => {
//     let timer: number | null = null;

//     return () => {
//         if (!timer) {
//             timer = setTimeout(() => {
//                 fn();
//                 timer = null;
//             }, time);
//         }
//     };
// };

// // 内存泄漏
// /**
//  *
//  * 1. 相互引用
//  *  function test() {
//  *      let obj1 = new Object();
//  *      let obj2 = new Object();
//  *      obj1.ref = obj2;
//  *      obj2.ref = obj1;
//  *  }
//  *
//  * 2. 全局变量未置为空
//  *
//  * 3. 闭包内部函数用外部变量，但调用只调用一部分，内部函数没有调用
//  *
//  * 4. setTimeout/ setInterval 没有clear
//  *
//  * 5. dom 绑定的事件找不到元素的或元素删除的
//  */

// let el = document.querySelector('div');

// el?.addEventListener(
//     'click',
//     (event) => {
//         event.stopPropagation();
//     },
//     true
// );

// // export function newFun(fn: any, ...args) {
// //     let myObj = {};
// //     myObj.__proto__ = fn.prototype;
// //     let result = fn.apply(myObj, args);

// //     return result instanceof Object ? result : myObj;
// // }

// const req = window.indexedDB.open('test', 4);

// let db = null;

// req.onerror = (event: Event) => {
//     console.log('indexDB open error');
// };

// req.onsuccess = (event: Event) => {
//     db = (event.target as any)?.result;
//     console.log('indexDB open success');
// };

// req.onupgradeneeded = (event: IDBVersionChangeEvent) => {};

// function Parent() {
//     this.isShow = false;
//     this.info = {
//         age: 18,
//         name: 'abc',
//     };
// }

// Parent.prototype.getInfo = function () {
//     console.log(this.isShow);
//     console.log(this.info);
// };

// function Child() {}
// // 原型链继承
// Child.prototype = new Parent();

// let child = new Child();
// child.info.gender = '男';
// child.getInfo();

// // 构造函数继承
// function Child1(gender) {
//     Parent.call(this, gender);
// }

function findKOr(nums: number[], k: number): number {
    let cnt = new Array(32).fill(0);

    for (let num of nums) {
        console.log(num);
        for (let i = 0; i < 32; i++) {
            if ((Number(num) & (1 << i)) !== 0) cnt[i]++;
        }
    }

    console.log(cnt);

    let res = 0;
    for (let i = 0; i < 32; i++) {
        if (cnt[i] >= k) res |= 1 << i;
    }

    return res;
}
console.log(findKOr([7, 12, 9, 8, 9, 15], 4));

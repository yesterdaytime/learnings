let a = new Proxy(
    { _store: 0 },
    {
        get(target, p, receiver) {
            if (Symbol.toPrimitive === p) {
                let result = target._store;
                target._store = 0;
                return () => result;
            }

            target._store += +p;
            // console.log(target._store);
            return receiver;
        },
    }
);

console.log(a[1][2] + a[2][3]);
console.log(~~a[2][3]);

let assert = new Proxy(
    {},
    {
        set(target, message, value) {
            console.log(message, value);
            if (!value) console.error(message);
        },
    }
);

assert["Isn't true"] = false; // Error: Isn't true
assert['Less than 18'] = 18 >= 19; // Error: Less than 18
// Proxy apply处理function, get 处理value.,如果返回function 结果还是function,需要有中断点，不然拿不到值
const fn = new Proxy((arg) => arg + 10, {
    apply(target, thisArgs, args) {
        console.log(target, thisArgs, args);
        return Reflect.apply(target, thisArgs, args);
    },
});

console.log(fn(1));

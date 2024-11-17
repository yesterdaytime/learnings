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

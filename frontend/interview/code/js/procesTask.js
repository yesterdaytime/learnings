function progressTask(...tasks) {
    let isRunning = false,
        next = tasks.shift(),
        result = [];
    return {
        start: () =>
            new Promise(async (resolve) => {
                if (isRunning) {
                    return;
                }

                isRunning = true;

                while (next) {
                    let r = await next();
                    result.push(r);
                    next = tasks.shift();
                    if (!isRunning) {
                        return;
                    }
                }

                isRunning = false;
                resolve(result);
            }),
        pause: () => {
            isRunning = false;
        },
    };
}

let tasks = [];

for (let i = 0; i < 5; i++) {
    tasks.push(() => {
        console.log(`task ${i + 1} start`);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(i + 1);
                console.log(`task ${i + 1} end`);
            }, 2000);
        });
    });
}

let pt = progressTask(...tasks);

pt.start();

setTimeout(() => {
    console.log('pause');
    pt.pause();
}, 5000);

setTimeout(() => {
    console.log('restart');
    pt.start();
}, 12000);

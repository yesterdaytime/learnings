function getElement(selector) {
    const dom = document.querySelector(selector);

    const proxy = new Proxy(dom, {
        get(target, p, receiver) {
            if (p.startsWith('wait')) {
                return new Promise((resolve) => {
                    const eventName = p.slice(4).toLowerCase();
                    dom.addEventListener(eventName, resolve, {
                        once: true,
                    });
                });
            } else {
                return Reflect.get(target, p, receiver);
            }
        },
    });

    return proxy;
}

const numberBtn = document.querySelector('btn-count');
const p = document.querySelector('p');

numberBtn.addEventListener('click', () => {
    p.innerText = parseInt(p.innerText) + 1;
});

(async () => {
    const btn = getElement('.btn');
    while (1) {
        await btn.waitClick;
        console.log('clicked');
    }
})();

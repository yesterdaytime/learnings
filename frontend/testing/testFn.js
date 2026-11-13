const test = (fn) => {
    fn('test');
};

const fn = (data) => {
    console.log('Test is a testing' + data);
};

test(fn);

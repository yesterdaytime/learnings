const user = {
    name: 'Jim',
    firstName: 'Jack',
    LastName: 'Fitue',
    age: 1233,
    languages: ['Ts', 'VS'],
};

console.log(JSON.stringify(user)); // string in one line

console.log(JSON.stringify(user, null, 2)); // formated, every line has +2 space

console.log(JSON.stringify(user, 'name', 2)); // will return full data, string can't

console.log(JSON.stringify(user, ['name', 'age'], 2));

const replacer = (key, value) => {
    return value;
};

console.log(JSON.stringify(user, replacer, 2));

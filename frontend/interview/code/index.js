//#region Symbol
let group = {
    title: 'Our Group',
    students: ['John', 'Pete', 'Alice'],

    showList() {
        title = 'test';
        this.students.forEach((student) => {
            // Error: Cannot read property 'title' of undefined
            console.log(this.title + ': ' + student);
        });
    },
};

group.showList();

class Song {
    constructor(name, artist, duration) {
        this.name = name;
        this.artist = artist;
        this.duration = duration;
    }
}
class Playlist {
    constructor() {
        this.songs = [];
    }
    addSong(song) {
        this.songs.push(song);
    }
    [Symbol.iterator]() {
        let index = 0;
        const songs = this.songs;
        return {
            next: () => ({ value: songs[index++], done: index > songs.length }),
        };
    }
}
const playlist = new Playlist();
playlist.addSong(new Song('Song 1', 'Artist 1', '3:45'));
playlist.addSong(new Song('Song 2', 'Artist 2', '4:20'));
playlist.addSong(new Song('Song 3', 'Artist 3', '5:10'));
for (const song of playlist) {
    console.log(song.name);
} // 输出： // "Song 1" // "Song 2" // "Song 3"

class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    get [Symbol.toStringTag]() {
        return 'People';
    }
}
const people = new People('ConardLi', 17);
console.log(people.toString()); // [object People]

class MyDateTime {
    constructor(year, month, day, hour = 0, minute = 0, second = 0) {
        this._datetime = new Date(year, month - 1, day, hour, minute, second);
    }
    [Symbol.toPrimitive](hint) {
        switch (hint) {
            case 'number':
                return this._datetime.getTime();
            case 'string':
                return this._datetime.toLocaleString();
            default:
                return this._datetime.toString();
        }
    }
}
const myDate = new MyDateTime(2023, 4, 8, 15, 30, 0);
console.log(myDate); // 输出：Sat Apr 08 2023 15:30:00 GMT+0800 (中国标准时间)
console.log(myDate + 10000); // 输出：1699950200000
console.log(`${myDate}`); // 输出："2023/4/8 下午3:30:00"

class AsyncDataSource {
    constructor(data) {
        this._data = data;
    }
    async *[Symbol.asyncIterator]() {
        for (const item of this._data) {
            const result = await this._processAsyncData(item);
            yield result;
        }
    }
    async _processAsyncData(item) {
        // 模拟异步处理数据的过程
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(item.toUpperCase());
            }, Math.random() * 1000);
        });
    }
}
async function processData() {
    const dataSource = new AsyncDataSource(['a', 'b', 'c', 'd', 'e']);
    for await (const data of dataSource) {
        console.log(data);
    }
}
processData();

(function () {
    class CustomRegExp extends RegExp {
        [Symbol.match](str) {
            const matches = super[Symbol.match](str);
            if (matches) {
                return matches.map((match) => {
                    return `匹配到了: ${match}`;
                });
            }
            return matches;
        }
    }
    const regex = new CustomRegExp('hello', 'g');
    const result = 'hello world'.match(regex);
    console.log(result); // ["匹配到了: hello"]
})();

const vowels = ['a', 'e', 'i', 'o', 'u'];
const customReplace = (str) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            result += '*';
        } else {
            result += str[i];
        }
    }
    return result;
};
const customString = { [Symbol.replace]: customReplace };
const originalString = 'hello world';
const result = originalString.replace(customString, '');
console.log(result); // outputs "h*ll* w*rld"

const customSplit = (str) => str.split(/[\s$¥€]+/);
const customRegExp = { [Symbol.split]: customSplit };
const string = '100$200¥300€400 500';
console.log(string.split(customRegExp)); // outputs [ '100', '200', '300', '400', '500' ]
const globalVars = {
    a: 10,
    b: 20,
    [Symbol.unscopables]: {
        b: true,
    },
};
with (globalVars) {
    console.log(a); // 输出 10
    console.log(b); // 抛出 ReferenceError
}

//#endregion

function deepClone(obj, deep) {
    let obj = {};

    Object.keys((key) => {
        if (deep && typeof obj[key] === 'object' && obj[key] !== null) {
            obj[key] = deepClone(obj[key], deep);
        } else {
            obj[key] = obj[key];
        }
    });
}

// 1) 创建 XMLHttpRequest 对象
let xhr = new XMLHttpRequest();
// 2) 设置请求信息
xhr.open(method, url);
//可以设置请求头，一般不设置
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
// 3) 发送请求
xhr.send(body); //get 请求不传 body 参数，只有 post 请求使用
// 4) 接收响应
//xhr.responseXML 接收 xml 格式的响应数据
//xhr.responseText 接收文本格式的响应数据
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var text = xhr.responseText;
        console.log(text);
    }
};

new Promise(42).then();

//#region  indexDB

const storeName = 'test';

const req = window.indexedDB.open(storeName, 4);

let db = null;

const parm = {
    dbName: storeName, //数据库名称
    version: 4,
    objName: 'test', // 表名称
    param: { a: 1 }, // id值
    response: {
        // 存储的value
        b: 2,
    },
};
req.onerror = (event) => {
    console.log(event);
};

req.onsuccess = (event) => {
    let db = event.target.result;
};

req.onupgradeneeded = (event) => {
    db = event.target.result;

    if (db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'key' });
        db.deleteObjectStore();
    }
};

let transaction = db.transaction([parm.objName], 'readwrite');
let objectStore = transaction.objectStore(parm.objName);

// 用户读取数据，参数是主键
let request = objectStore.add({
    id: JSON.stringify(parm.param),
    data: JSON.stringify(parm.response),
});

//#endregion

function fileMD5(files) {
    // 计算文件md5
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        const piece = Math.ceil(files.size / this.pieceSize);
        const nextPiece = () => {
            let start = currentPieces * this.pieceSize;
            let end =
                start * this.pieceSize >= files.size
                    ? files.size
                    : start + this.pieceSize;
            fileReader.readAsArrayBuffer(files.slice(start, end));
        };
        let currentPieces = 0;
        fileReader.onload = (event) => {
            let e = window.event || event;
            this.spark.append(e.target.result);
            currentPieces++;
            if (currentPieces < piece) {
                nextPiece();
            } else {
                resolve({ fileName: files.name, fileMd5: this.spark.end() });
            }
        };
        fileReader.onerror = (err) => {
            reject(err);
        };
        nextPiece();
    });
}

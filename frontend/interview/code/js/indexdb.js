/*
  parm = {
        dbName: "test",   //数据库名称
        objName: "test1",  // 表名称
        param: { a: 1 },   // id值
        response: {        // 存储的value
          b: 2,
        },
 }
*/
export default class TestDb {
    constructor() {
        this.db = null;
    }
    getType(val) {
        let type = typeof val == 'object';
        return type;
    }
    // 打开数据库
    open(parm) {
        return new Promise((res, rej) => {
            let request = window.indexedDB.open(parm.dbName, parm.versions);
            request.onerror = function (event) {
                console.log(event);
                // 错误处理
                rej();
                console.log(' 打开数据库报错');
            };
            request.onsuccess = (event) => {
                this.db = request.result;
                console.log('打开数据库成功');
                res();
                // 成功处理
            };
            // 数据库更新时的回调
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                this.createdDB(parm);
            };
        });
    }
    // 创建库表
    createdDB(parm) {
        console.log(parm);

        if (!this.db.objectStoreNames.contains(parm.objName)) {
            this.db.createObjectStore(parm.objName, {
                keyPath: 'id',
            });
            // objectStore.createIndex("data", "data", { unique: false });
            // unique name可能会重复
        }
    }
    // 新增（不需要使用）
    async add(parm = { dbName, objName, param, response }) {
        await this.open(parm);
        // await this.upgrade(dbName);
        return new Promise((res, rej) => {
            let type = this.getType(parm.param);
            let type1 = this.getType(parm.response);
            let transaction = this.db.transaction([parm.objName], 'readwrite');
            let objectStore = transaction.objectStore(parm.objName);

            // 用户读取数据，参数是主键
            let request = objectStore.add({
                id: type ? JSON.stringify(parm.param) : parm.param,
                data: type1 ? JSON.stringify(parm.response) : parm.response,
            });
            console.log(request);

            request.onsuccess = function (event) {
                res(event);
                console.log('数据写入成功');
            };

            request.onerror = function (event) {
                rej();
                console.log('数据写入失败');
            };
        });
    }
    // 读取库表数据
    async read(parm = { dbName, objName, param, response }) {
        await this.open(parm);

        return new Promise((res, rej) => {
            let type = this.getType(parm.param);

            var transaction = this.db.transaction([parm.objName]);
            var objectStore = transaction.objectStore(parm.objName);
            // 用户读取数据，参数是主键
            var request = objectStore.get(
                type ? JSON.stringify(parm.param) : parm.param
            );

            request.onerror = function (event) {
                console.log('事务失败');
                rej();
            };

            request.onsuccess = function (event) {
                if (request.result) {
                    let data = JSON.parse(request.result.data);
                    res(data);
                } else {
                    res(request.result);
                    console.log('未获得数据记录');
                }
            };
        });
    }
    // 修改库表数据,但是因为创建数据库时直接创建了库表,所以无论是添加还是修改都掉这个就可以了.
    async update(parm = { dbName, objName, param, response }) {
        await this.open(parm);

        return new Promise((res, rej) => {
            let type = this.getType(parm.param);
            let type1 = this.getType(parm.response);

            console.log(parm);
            var request = this.db
                .transaction([parm.objName], 'readwrite')
                .objectStore(parm.objName)
                .put({
                    id: type ? JSON.stringify(parm.param) : parm.param,
                    data: type1 ? JSON.stringify(parm.response) : parm.response,
                });

            request.onsuccess = function (event) {
                res();
                console.log('数据更新成功');
            };

            request.onerror = function (event) {
                rej();
                console.log('数据更新失败');
            };
        });
    }
    // 删除某个表的数据
    async remove(parm = { dbName, objName, param, response }) {
        await this.open(parm);

        return new Promise((res, rej) => {
            let type = this.getType(parm.param);

            var request = this.db
                .transaction([parm.objName], 'readwrite')
                .objectStore(parm.objName)
                .delete(type ? JSON.stringify(parm.param) : parm.param);

            request.onsuccess = function (event) {
                res();
                console.log('数据删除成功');
            };
        });
    }
}

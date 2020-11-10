/**
 * 遍历指定目录下的所有路由文件
 * 自动注册
 */
const fs = require('fs');

// 注册路由
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            console.log(`register URL mapping: PUT ${path}`);
        } else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            console.log(`register URL mapping: DELETE ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

// 读取controller下的所有js文件
function addControllers(router, dir) {
    console.log(__dirname, dir)
    fs.readdirSync(__dirname + '/../' + dir).filter((f) => {
        return f.endsWith('.js');
    }).forEach((f) => {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/../' + dir + '/' + f);
        addMapping(router, mapping);
    });
}

// 导出注册的结果
module.exports = function (dir) {
    let
        controllers_dir = dir || 'controller',
        router = require('koa-router')();
    addControllers(router, controllers_dir);
    return router.routes();
};
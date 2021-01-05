import * as http from "http";
import * as path from "path";
import {readFile} from "fs";
import {parse as parseUrl} from "url";

const server = http.createServer();
// 文件目录
const publicDir = path.resolve(__dirname, 'public');
// 缓存时间，默认为一年
const cacheAge = 3600 * 24 * 365;

server.addListener('request', (request, response) => {
    // 目标一，访问 public 下的文件
    // 目标二，处理地址栏参数
    // 目标三，自动读取文件目录下的文件
    const {method, headers, url} = request
    console.log('method', method);
    console.log('headers', headers);
    console.log('url', url);

    // 静态服务器 只能接受 get请求
    if (method !== 'GET') {
        response.statusCode = 405;
        response.end();
        return
    }

    const {pathname} = parseUrl(url);

    // 截取文件名
    let filename = pathname.substr(1);
    // 如果文件名为空的时候，就读取默认首页
    if (!filename) {
        filename = 'index.html'
    }
    // 读取文件
    readFile(path.resolve(publicDir, filename), ((err, data) => {
        if (err) {
            // 文件不存在代码判断
            if (err.errno === -4058) {
                response.statusCode = 404;
                readFile(path.resolve(publicDir, '404.html'), (error, data) => {
                    if (error) throw error
                    response.end(data);
                })
            } else if (err.errno === -4068) {
                response.statusCode = 403;
                response.end();
            } else {
                response.statusCode = 500;
                response.end();
            }
            console.log('err', err)
            return false;
        };
        // 响应成功，添加缓存
        response.setHeader('Cache-Control', `public, max-age=${cacheAge}`);
        response.end(data);
    }));

    // ------ 目标一 代码 ------
    // const urlResult = {
    //     '/index.html': {
    //         name: 'index.html',
    //         type: 'text/html'
    //     },
    //     '/style.css': {
    //         name: 'style.css',
    //         type: 'text/css'
    //     },
    //     '/main.js': {
    //         name: 'main.js',
    //         type: 'text/javascript'
    //     },
    // };
    //
    // const file = urlResult[pathname];
    //
    // if (file) {
    //     // 1. 设置相应类型
    //     response.setHeader('Content-Type', `${file.type}; charset=utf-8`);
    //     // 2. 读取文件 并返回相应的内容
    //     readFile(path.resolve(publicDir, file.name), ((err, data) => {
    //         if (err) throw err;
    //         response.end(data.toString());
    //     }));
    // } else {
    //     response.statusCode = 404;
    //     response.end();
    // }
});

server.listen(3000, () => {
    console.log('Server on http://localhost:3000');
});

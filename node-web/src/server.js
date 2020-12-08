const express = require('express');
const { resolve } = require('path');
const { promisify } = require('util');
const initControllers = require('./controllers');
const initMiddlewares = require('./middlewares');

const server = express();
const port = parseInt(process.env.PORT || '9000');
const publicDir = resolve('public');
const mouldsDir = resolve('src/moulds');

async function bootstrap () {
    server.use(express.static(publicDir));
    server.use('/moulds', express.static(mouldsDir));
    server.use(await initMiddlewares());
    server.use(await initControllers());
    await promisify(server.listen.bind(server, port))();
    console.log(`> Started on port ${port}`);
}

// 监听未捕获的 Promise 异常，直接退出进程
process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
})

void bootstrap();

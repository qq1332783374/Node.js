const {Router} = require('express');
const shopControllers = require('./shop');
const chaosController = require('./chaos');
const healthController = require('./health');

module.exports = async function initControllers () {
    const router = Router();

    // 商品路由
    router.use('/api/shop', await shopControllers());
    // 错误异常处理路由
    router.use('/api/chaos', await chaosController());
    // 健康检查
    router.use('/api/health', await healthController());

    return router;
}
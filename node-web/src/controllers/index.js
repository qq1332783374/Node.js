const {Router} = require('express');
const shopControllers = require('./shop');

module.exports = async function initControllers () {
    const router = Router();

    router.use('/api/shop', await shopControllers());

    return router;
}
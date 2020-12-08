const { Router } = require('express');
const bodyParser = require('body-parser');
const shopService = require('../services/shop.js');
const {createShopFormSchema} = require('../moulds/ShopForm');

class ShopControllers {
    shopService;

    async init () {
        this.shopService = await shopService();

        // 路由
        const router = Router();

        router.get('/', this.getAll);
        router.get('/:shopId', this.getOne);
        router.put('/:shopId', this.put);
        router.delete('/:shopId', this.delete);
        router.post('/', bodyParser.urlencoded({extended: false}), this.post);

        return router;
    }

    getAll =  async (req, res) => {
        const {pageIndex, pageSize} = req.query;
        const shopList = await this.shopService.find({pageIndex, pageSize});

        res.send({
            success: true,
            data: shopList
        });
    }

    getOne = async (req, res)  => {
        const {shopId} = req.params;
        const shopList = await this.shopService.find({id: shopId});

        shopList.length 
        ? res.send({success: true, data: shopList})
        : res.status(404).send({success: false, data: null})
    }

    post = async (req, res) => {
        const {name} = req.body;

        try {
            await createShopFormSchema().validate({name})
        } catch (e) {
            res.status(400).send({ success: false, message: e.message });
            return
        }

        const shopInfo = await this.shopService.create({values: name});

        res.send({success: true, data: shopInfo});
    }

    put = async (req, res) => {
        const {shopId} = req.params;
        const {name} = req.query;

        // 提交过来的数据效验
        try {
            await createShopFormSchema().validate({name});
        } catch (e) {
            res.status(400).send({ success: false, message: e.message });
            return
        }

        const shopInfo = await this.shopService.modify({
            id: shopId,
            values: {name}
        });

        Object.keys(shopInfo).length 
        ? res.send({success: true, data: shopInfo})
        : res.status(404).send({success: false, data: null})
    }

    delete = async (req, res) => {
        const {shopId} = req.params;
        const success = await this.shopService.remove({id: shopId});

        if (!success) {
            res.status(404)
        }
        res.send({success: true})
    }
}

module.exports = async () => {
    const c = new ShopControllers();
    return await c.init();
}

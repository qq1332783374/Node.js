const { Shop } = require('../models');

// 延时模拟
async function delay (ms = 200) {
    await new Promise((r) => setTimeout(r, ms));
}

class ShopService {
    async init () {
    }

    // 创建店铺
    async create({values}) {
        const newShop = await Shop.create(values);
        return newShop;
    }

    async find ({id, pageIndex = 0, pageSize = 10}) {
        if (id) {
            return [await Shop.findByPk(id)];
        }

        const list = await Shop.findAll({
            offset: pageIndex * pageSize,
            limit: pageSize,
        });
        return list
    }

    async modify ({id, values}) {
        const target = await Shop.findByPk(id);

        if (!target) {
            return null;
        }
        Object.assign(target, values);

        return await target.save();
    }

    async remove ({id}) {
        const target = await Shop.findByPk(id);

        if (!target) {
            return null;
        }

        return target.destroy();
    }
}

// 单例模式
let service;
module.exports = async function () {
    if (!service) {
        service = new ShopService();
        await service.init();
    }
    return service
}

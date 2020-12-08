/**
 * 健康状态检测
 * 服务进程在重启时会有短暂一段时间的不可用，
 * 在实际生产环境会使用负载均衡将访问分发到多个应用节点提高可用性。
 * 需要提供健康状态检测来帮助负载均衡判断流量去向。
 * 由于当前的异常处理机制会保持程序的合理状态，
 * 因此只要提供一个可访问的接口就能够代表健康状态
 * */
const {Router} = require('express');

class HealthController {
    async init () {
        const router = Router();
        router.get('/', this.get);
        return router;
    }

    get = (req, res) => {
        res.send({})
    }
}

module.exports = async () => {
    const c = new HealthController();
    return await c.init();
}

/*
* 路由修正 中间键
* */
const {normalize} = require('path');
const {parse, format} = require('url');

module.exports = function urlnormalizeMiddleware () {
    return (req, res, next) => {
        // 解决windows、Linux系统使用normalize路径分隔符不一致的问题
        const pathname = normalize(req.path).split('\\').join('/');
        const urlParsed = parse(req.url);

        let shouldRedirect = false;

        if (req.path !== pathname) {
            urlParsed.pathname = pathname
            shouldRedirect = true
        }

        // 执行重定向或者跳过
        shouldRedirect ? res.redirect(format(urlParsed)) : next();
    }
}

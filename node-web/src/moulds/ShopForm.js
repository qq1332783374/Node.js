/**
 * 利用 yup 模块对表单进行校验
 * yup github https://github.com/jquense/yup
 */
const Yup = require('yup');

/**
 * 创建表单校验模型
 */
exports.createShopFormSchema = () => Yup.object({
    name: Yup.string()
    .required('店铺名不能为空')
    .min(3, '店铺名称至少3个字符')
    .max(20, '店铺名称不能大于20个字符')
})

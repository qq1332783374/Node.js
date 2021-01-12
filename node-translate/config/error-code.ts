type errorMap = {
    [key: string]: ErrorMsg
}

export type ErrorMsg = {
    meaning?: string,
    solution?: string
}

const ErrorMap: errorMap = {
    52000: {
        meaning: '',
        solution: '',
    },
    52001: {
        meaning: '请求超时',
        solution: '重试',
    },
    52002: {
        meaning: '系统错误',
        solution: '重试',
    },
    52003: {
        meaning: '未授权用户',
        solution: '请检查您的appid是否正确，或者服务是否开通',
    },
    54000: {
        meaning: '必填参数为空',
        solution: '请检查是否少传参数',
    },
    54001: {
        meaning: '签名错误',
        solution: '请检查您的签名生成方法',
    },
    54003: {
        meaning: '访问频率受限',
        solution: '请降低您的调用频率，或进行身份认证后切换为高级版/尊享版',
    },
    54004: {
        meaning: '账户余额不足',
        solution: '请前往管理控制台为账户充值',
    },
    54005: {
        meaning: '长query请求频繁',
        solution: '请降低长query的发送频率，3s后再试',
    },
    58000: {
        meaning: '客户端IP非法',
        solution: '检查个人资料里填写的IP地址是否正确，可前往开发者信息-基本信息修改，可前往开发者信息-基本信息修改',
    },
    58001: {
        meaning: '译文语言方向不支持',
        solution: '检查译文语言是否在语言列表里',
    },
    58002: {
        meaning: '服务当前已关闭',
        solution: '请前往管理控制台开启服务',
    },
    90107: {
        meaning: '认证未通过或未生效',
        solution: '请前往我的认证查看认证进度',
    }
}

export default ErrorMap
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 基于百度翻译API，实现的命令行翻译工具
 * 百度翻译开放平台官网：https://fanyi-api.baidu.com/
 * */
var commander_1 = require("commander");
var axios_1 = __importDefault(require("axios"));
var chalk_1 = __importDefault(require("chalk"));
var ora_1 = __importDefault(require("ora"));
var md5_1 = __importDefault(require("md5"));
var error_code_1 = __importDefault(require("../config/error-code"));
var config_1 = __importDefault(require("../config"));
var ZH = 'zh';
var EN = 'en';
var program = new commander_1.Command();
program.version('0.0.1');
program
    .action(function (_a) {
    var args = _a.args;
    return __awaiter(void 0, void 0, void 0, function () {
        var q, qType, from, to, salt, sign, spinner, BASE_API, data, translateRes, errorCode, errorMsg;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!args.length) return [3 /*break*/, 2];
                    q = args[0];
                    console.log(chalk_1.default.blue("\u8F93\u5165\u5185\u5BB9\uFF1A" + q));
                    qType = /^[a-zA-Z]+$/.test(q);
                    from = qType ? EN : ZH;
                    to = qType ? ZH : EN;
                    salt = (new Date).getTime();
                    sign = md5_1.default(config_1.default.appId + q + salt + config_1.default.secretKey);
                    spinner = ora_1.default('翻译中...').start();
                    BASE_API = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
                    return [4 /*yield*/, axios_1.default({
                            method: 'GET',
                            url: BASE_API,
                            params: {
                                q: q,
                                from: from,
                                to: to,
                                appid: config_1.default.appId,
                                salt: salt,
                                sign: sign
                            }
                        })];
                case 1:
                    data = (_b.sent()).data;
                    translateRes = data;
                    console.log('\n');
                    // 2. 关闭加载状态
                    spinner.stop();
                    errorCode = translateRes.error_code;
                    if (errorCode) {
                        errorMsg = error_code_1.default[translateRes.error_code];
                        console.log(chalk_1.default.red("\u9519\u8BEF\u4EE3\u7801\uFF1A" + errorCode));
                        console.log(chalk_1.default.red("\u9519\u8BEF\u4FE1\u606F\uFF1A" + errorMsg.meaning + "\uFF0C" + errorMsg.solution));
                        return [2 /*return*/];
                    }
                    /*---------------*/
                    console.log(chalk_1.default.green("\u7FFB\u8BD1\u7ED3\u679C\uFF1A" + translateRes.trans_result[0].dst));
                    return [3 /*break*/, 3];
                case 2:
                    console.log(chalk_1.default.red('请输入需要翻译的内容！'));
                    _b.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
});
program.parse(process.argv);

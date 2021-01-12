/**
 * 基于百度翻译API，实现的命令行翻译工具
 * 百度翻译开放平台官网：https://fanyi-api.baidu.com/
 * */
import {Command} from 'commander';
import axios from 'axios';
import chalk from 'chalk';
import ora from 'ora';
import md5 from 'md5';
import ErrorMap, {ErrorMsg} from '../config/error-code';
import config from '../config';

const ZH = 'zh';
const EN = 'en';

type BaiduResult = {
    error_code?: string,
    error_msg?: string,
    from: string,
    to: string,
    trans_result: {src: string, dst: string}[]
}

const program = new Command();

program.version('0.0.1');


program
    .action(async ({args}): Promise<void> => {
        if (args.length) {
            // 1. 需要翻译的内容
            const q = args[0]
            console.log(
                chalk.blue(
                    `输入内容：${q}`,
                )
            )
            // 2. 输入翻译语言类型
            const qType = /^[a-zA-Z]+$/.test(q)
            const from = qType ? EN : ZH
            // 3. 翻译结果语言类型
            const to = qType ? ZH : EN
            // 4. 随机数
            const salt = (new Date).getTime();
            // 5. 签名：appid+q+salt+密钥 的MD5值
            const sign = md5(config.appId + q + salt + config.secretKey)
            /*------------------*/
            // 1. 加载状态
            const spinner = ora('翻译中...').start();
            const BASE_API = 'http://api.fanyi.baidu.com/api/trans/vip/translate'
            const {data } = await axios({
                method: 'GET',
                url: BASE_API,
                params: {
                    q,
                    from,
                    to,
                    appid: config.appId,
                    salt,
                    sign
                }
            });
            const translateRes: BaiduResult = data;
            console.log('\n');
            // 2. 关闭加载状态
            spinner.stop();
            // 3. 错误处理
            const errorCode = translateRes.error_code
            if (errorCode) {
                // @ts-ignore
                const errorMsg: ErrorMsg = ErrorMap[translateRes.error_code];
                console.log(chalk.red(`错误代码：${errorCode}`));
                console.log(chalk.red(`错误信息：${errorMsg.meaning}，${errorMsg.solution}`));
                return;
            }
            /*---------------*/
            console.log(
                chalk.green(
                    `翻译结果：${translateRes.trans_result[0].dst}`
                )
            );
        } else {
            console.log(
                chalk.red('请输入需要翻译的内容！')
            );
        }
    })

program.parse(process.argv);

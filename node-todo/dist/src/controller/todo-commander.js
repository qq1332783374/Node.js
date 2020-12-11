"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const path_1 = require("path");
const dayjs_1 = __importDefault(require("dayjs"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const home = process.env.HOME || os_1.homedir();
const dbPath = path_1.join(home, '.todo');
class TodoCommander {
    add(item) {
        try {
            // 1. 读取上次添加的任务内容
            const db = fs_1.default.readFileSync(dbPath, { flag: 'a+' });
            const todoList = JSON.parse(db.toString() || '[]');
            // 2. 新增的任务
            const inputList = item.args;
            if (!inputList.length) {
                return console.log(chalk_1.default.redBright('请输入代办事项'));
            }
            inputList.forEach(todo => {
                let obj = {
                    id: Math.ceil(Math.random() * 10000),
                    name: todo,
                    status: '未完成',
                    createDate: dayjs_1.default().format('YYYY-MM-DD HH:mm:ss')
                };
                todoList.push(obj);
            });
            // 3. 重新写入
            fs_1.default.writeFileSync(dbPath, JSON.stringify(todoList));
            console.log(chalk_1.default.greenBright('添加成功'));
        }
        catch (e) {
            console.log(chalk_1.default.redBright(e));
        }
    }
    clear() {
        inquirer_1.default
            .prompt({
            type: 'confirm',
            name: 'clearAll',
            message: '是否清除全部代办事项'
        }).then(res => {
            // 清除全部
            if (res.clearAll) {
                fs_1.default.writeFileSync(dbPath, JSON.stringify([]));
                return console.log(chalk_1.default.greenBright('清除成功'));
            }
        }).catch(e => {
            console.log(e);
        });
    }
}
const c = new TodoCommander();
exports.default = c;
//# sourceMappingURL=todo-commander.js.map
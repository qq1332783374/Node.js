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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const fs_1 = __importDefault(require("fs"));
const os_1 = require("os");
const path_1 = require("path");
const home = process.env.HOME || os_1.homedir();
const dbPath = path_1.join(home, '.todo');
class TodoService {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = fs_1.default.readFileSync(dbPath, { flag: 'a+' });
            this.todoList = JSON.parse(db.toString() || '[]');
        });
    }
    add(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.todoList.push(item);
            console.log(chalk_1.default.greenBright('添加成功'));
        });
    }
    updateList() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                fs_1.default.writeFileSync(dbPath, JSON.stringify(this.todoList));
            }
            catch (e) {
                console.log(chalk_1.default.redBright(e));
            }
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    showAll() {
        return __awaiter(this, void 0, void 0, function* () {
            inquirer_1.default
                .prompt({
                type: "list",
                name: 'value',
                message: '代办事项',
                choices: [
                    new inquirer_1.default.Separator('-----操作-----'),
                    { name: '退出', value: '-1' },
                    { name: '创建', value: '-2' },
                    new inquirer_1.default.Separator('-----任务-----'),
                    ...this.todoList
                ]
            })
                .then((res) => {
                console.log('res', res);
                const value = parseInt(res.value);
                if (value >= 0) {
                    console.log('item', value);
                }
                else if (value === -2) { // 创建任务
                    console.log('创建任务');
                    inquirer_1.default
                        .prompt({
                        type: 'input',
                        name: 'name',
                        message: '请输入代办'
                    })
                        .then(res => {
                        console.log('res', res);
                        this.todoList.push(res.name);
                        this.updateList();
                    })
                        .catch(e => {
                        console.log('e', e);
                    });
                }
            })
                .catch(e => {
                console.error(e);
            });
        });
    }
}
// 单例模式
let service;
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!service) {
            service = new TodoService();
            yield service.init();
        }
        return service;
    });
}
exports.default = default_1;
//# sourceMappingURL=todo.js.map
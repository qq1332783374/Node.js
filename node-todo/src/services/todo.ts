import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';
import {todoItem} from '../typings';
import {homedir} from 'os';
import {join} from 'path';

const home: string = process.env.HOME || homedir();
const dbPath: string = join(home, '.todo');

class TodoService {
    todoList:Array<todoItem>;

    async init () {
        const db = fs.readFileSync(dbPath, {flag: 'a+'});
        this.todoList = JSON.parse(db.toString() || '[]');
    }

    async add (item: todoItem) {
        this.todoList.push(item);
        console.log(chalk.greenBright('添加成功'));
    }

    async updateList () {
        try {
            fs.writeFileSync(dbPath, JSON.stringify(this.todoList));
        } catch (e) {
            console.log(chalk.redBright(e));
        }
    }

    async clear () {
        inquirer
            .prompt({
                type: 'confirm',
                name: 'clearAll',
                message: '是否清除全部代办事项'
            }).then(res => {
                // 清除全部
                if (res.clearAll) {
                    fs.writeFileSync(dbPath, JSON.stringify([]));
                    return console.log(chalk.greenBright('清除成功'));
                }
            }).catch(e => {
                console.log(e);
            })
    }

    async showAll () {
        inquirer
            .prompt({
                type: "list",
                name: 'value',
                message: '代办事项',
                choices: [
                    new inquirer.Separator('-----操作-----'),
                    {name: '退出', value: '-1'},
                    {name: '创建', value: '-2'},
                    new inquirer.Separator('-----任务-----'),
                    ...this.todoList
                ]
            })
            .then((res) => {
                console.log('res', res)
                const value: number = parseInt(res.value);
                if (value >= 0) {
                    console.log('item', value)
                } else if (value === -2) { // 创建任务
                    console.log('创建任务')
                    inquirer
                        .prompt({
                            type: 'input',
                            name: 'name',
                            message: '请输入代办'
                        })
                        .then(res => {
                            console.log('res', res)
                            this.todoList.push(res.name)
                            this.updateList()
                        })
                        .catch(e => {
                            console.log('e', e)
                        })
                }
            })
            .catch(e => {
                console.error(e);
            })
    }
}

// 单例模式
let service: TodoService;
export default async function () {
    if (!service) {
        service = new TodoService();
        await service.init();
    }
    return service
}

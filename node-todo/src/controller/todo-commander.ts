import {homedir} from 'os';
import {join} from 'path';
import {Command} from 'commander/typings';
import dayjs from 'dayjs';
import fs from 'fs'
import chalk from 'chalk';
import inquirer from 'inquirer';

const home: string = process.env.HOME || homedir();
const dbPath: string = join(home, '.todo');

interface todoItem {
    id: number,
    name: string,
    status: string,
    createDate: string
}

class TodoCommander {
    add (item: Command):void {
        try {
            // 1. 读取上次添加的任务内容
            const db = fs.readFileSync(dbPath, {flag: 'a+'});
            const todoList: Array<todoItem> = JSON.parse(db.toString() || '[]');
            
            // 2. 新增的任务
            const inputList = item.args;

            if (!inputList.length) {return console.log(chalk.redBright('请输入代办事项'))}

            inputList.forEach(todo => {
                let obj: todoItem = {
                    id: Math.ceil(Math.random() * 10000),
                    name: todo,
                    status: '未完成',
                    createDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
                };
                todoList.push(obj);
            })

            // 3. 重新写入
            fs.writeFileSync(dbPath, JSON.stringify(todoList));
            console.log(chalk.greenBright('添加成功'));
        } catch (e) {
            console.log(chalk.redBright(e));
        }
    }
    
    clear ():void {
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
}


const c = new TodoCommander();

export default c

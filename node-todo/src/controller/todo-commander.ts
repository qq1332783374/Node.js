import dayjs from 'dayjs';
import TodoService from '../services/todo';
import {Command} from 'commander/typings';
import {todoItem} from '../typings';

class TodoCommander {
    TodoService: any;
    async init () {
        this.TodoService = await TodoService();
        return {
            add: this.add,
            clear: this.clear,
            showAll: this.showAll
        }
    }

    add = async (item: Command) => {
        // 1. 新增的任务
        const inputList = item.args;

        if (!inputList.length) {return console.log('请输入代办事项')}

        inputList.forEach(todo => {
            const id: number = Math.ceil(Math.random() * 10000)
            let obj: todoItem = {
                id: id,
                name: todo,
                value: id.toString(),
                createDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
            };
            this.TodoService.add(obj);
        })

        // 2. 重新写入
        await this.TodoService.updateList();
    }
    
    clear = async () => {
        await this.TodoService.clear();
    }

    showAll = async () => {
        await this.TodoService.showAll();
    }
}

export default async () => {
    const c = new TodoCommander();
    return await c.init();
}

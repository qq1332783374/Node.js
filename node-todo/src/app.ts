import {Command} from 'commander';
import {version} from '../package.json';
import API from './controller/todo-commander';

const program = new Command();

export default async function () {
    
    // 版本信息
    program.version(version, '-v, --version');

    // 新增命令
    program
        .command('add')
        .description('add todo task')
        .action((await API()).add)

    // 清除命令
    program
        .command('clear')
        .description('clear all')
        .action((await API()).clear)

    const argvLen: number = process.argv.length
    if (argvLen === 2) {
        await (await API()).showAll();
    } else {
        program.parse(process.argv);
    }
}

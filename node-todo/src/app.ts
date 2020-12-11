import { program } from 'commander';
import {version} from '../package.json';
import API from './controller/todo-commander';

export default function () {
    
    // 版本信息
    program.version(version, '-v, --version');

    // 新增命令
    program
        .command('add')
        .description('add todo task')
        .action(API.add)

    // 清除命令
    program
        .command('clear')
        .description('claer all')
        .action(API.clear)

    program.parse(process.argv);
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const package_json_1 = require("../package.json");
const todo_commander_1 = __importDefault(require("./controller/todo-commander"));
function default_1() {
    // 版本信息
    commander_1.program.version(package_json_1.version, '-v, --version');
    // 新增命令
    commander_1.program
        .command('add')
        .description('add todo task')
        .action(todo_commander_1.default.add);
    // 清除命令
    commander_1.program
        .command('clear')
        .description('claer all')
        .action(todo_commander_1.default.clear);
    commander_1.program.parse(process.argv);
}
exports.default = default_1;
//# sourceMappingURL=app.js.map
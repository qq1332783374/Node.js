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
const commander_1 = require("commander");
const package_json_1 = require("../package.json");
const todo_commander_1 = __importDefault(require("./controller/todo-commander"));
const program = new commander_1.Command();
function default_1() {
    return __awaiter(this, void 0, void 0, function* () {
        // 版本信息
        program.version(package_json_1.version, '-v, --version');
        // 新增命令
        program
            .command('add')
            .description('add todo task')
            .action((yield todo_commander_1.default()).add);
        // 清除命令
        program
            .command('clear')
            .description('clear all')
            .action((yield todo_commander_1.default()).clear);
        const argvLen = process.argv.length;
        if (argvLen === 2) {
            yield (yield todo_commander_1.default()).showAll();
        }
        else {
            program.parse(process.argv);
        }
    });
}
exports.default = default_1;
//# sourceMappingURL=app.js.map
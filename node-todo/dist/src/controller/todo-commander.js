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
const dayjs_1 = __importDefault(require("dayjs"));
const todo_1 = __importDefault(require("../services/todo"));
class TodoCommander {
    constructor() {
        this.add = (item) => __awaiter(this, void 0, void 0, function* () {
            // 1. 新增的任务
            const inputList = item.args;
            if (!inputList.length) {
                return console.log('请输入代办事项');
            }
            inputList.forEach(todo => {
                const id = Math.ceil(Math.random() * 10000);
                let obj = {
                    id: id,
                    name: todo,
                    value: id.toString(),
                    createDate: dayjs_1.default().format('YYYY-MM-DD HH:mm:ss'),
                    updateTime: dayjs_1.default().format('YYYY-MM-DD HH:mm:ss')
                };
                this.TodoService.add(obj);
            });
            // 2. 重新写入
            yield this.TodoService.updateList();
        });
        this.clear = () => __awaiter(this, void 0, void 0, function* () {
            yield this.TodoService.clear();
        });
        this.showAll = () => __awaiter(this, void 0, void 0, function* () {
            yield this.TodoService.showAll();
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.TodoService = yield todo_1.default();
            return {
                add: this.add,
                clear: this.clear,
                showAll: this.showAll
            };
        });
    }
}
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const c = new TodoCommander();
    return yield c.init();
});
//# sourceMappingURL=todo-commander.js.map
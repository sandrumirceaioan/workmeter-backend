"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const auth_guard_1 = require("../common/guards/auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const sign_interceptor_1 = require("../common/interceptors/sign.interceptor");
const modified_interceptor_1 = require("../common/interceptors/modified.interceptor");
const is_yours_interceptor_1 = require("../common/interceptors/is-yours.interceptor");
const history_interceptor_1 = require("../common/interceptors/history.interceptor");
let TasksController = class TasksController {
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    add(CreateTaskDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.addTask(CreateTaskDto);
        });
    }
    all(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.allTasks(params);
        });
    }
    one(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.oneTask(id);
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.updateTaskStatus(data);
        });
    }
    done(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.markAsDone(data);
        });
    }
    updateInfo(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.updateTaskInfo(data);
        });
    }
    assignTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tasksService.assignTask(data);
        });
    }
};
__decorate([
    common_1.Post('/add'),
    roles_decorator_1.Roles('admin', 'manager', 'user'),
    common_1.UseInterceptors(sign_interceptor_1.Sign, modified_interceptor_1.ModifiedBy, history_interceptor_1.MakeHistory),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "add", null);
__decorate([
    common_1.Post('/all'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "all", null);
__decorate([
    common_1.Post('/one'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "one", null);
__decorate([
    common_1.Put('/updateStatus'),
    common_1.UseInterceptors(modified_interceptor_1.ModifiedBy, is_yours_interceptor_1.IsYours, history_interceptor_1.MakeHistory),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
__decorate([
    common_1.Put('/done'),
    common_1.UseInterceptors(modified_interceptor_1.ModifiedBy, is_yours_interceptor_1.IsYours, history_interceptor_1.MakeHistory),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "done", null);
__decorate([
    common_1.Put('/updateInfo'),
    common_1.UseInterceptors(modified_interceptor_1.ModifiedBy, history_interceptor_1.MakeHistory),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateInfo", null);
__decorate([
    common_1.Put('/assignTask'),
    common_1.UseInterceptors(modified_interceptor_1.ModifiedBy, history_interceptor_1.MakeHistory),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "assignTask", null);
TasksController = __decorate([
    common_1.Controller('tasks'),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
exports.TasksController = TasksController;
//# sourceMappingURL=tasks.controller.js.map
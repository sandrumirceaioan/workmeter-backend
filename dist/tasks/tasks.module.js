"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tasks_controller_1 = require("./tasks.controller");
const tasks_service_1 = require("./tasks.service");
const tasks_schema_1 = require("./schema/tasks.schema");
const comments_module_1 = require("../comments/comments.module");
const history_module_1 = require("../history/history.module");
const workmeter_module_1 = require("../workmeter/workmeter.module");
let TasksModule = class TasksModule {
};
TasksModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'tasks', schema: tasks_schema_1.TasksSchema }]), comments_module_1.CommentsModule, history_module_1.HistoryModule, workmeter_module_1.WorkmeterModule
        ],
        controllers: [tasks_controller_1.TasksController],
        components: [tasks_service_1.TasksService],
        exports: [tasks_service_1.TasksService]
    })
], TasksModule);
exports.TasksModule = TasksModule;
//# sourceMappingURL=tasks.module.js.map
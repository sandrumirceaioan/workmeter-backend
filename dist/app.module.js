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
const app_controller_1 = require("./app.controller");
const users_module_1 = require("./users/users.module");
const projects_module_1 = require("./projects/projects.module");
const lists_module_1 = require("./lists/lists.module");
const tasks_module_1 = require("./tasks/tasks.module");
const comments_module_1 = require("./comments/comments.module");
const history_module_1 = require("./history/history.module");
const workmeter_module_1 = require("./workmeter/workmeter.module");
let ApplicationModule = class ApplicationModule {
};
ApplicationModule = __decorate([
    common_1.Module({
        imports: [
            users_module_1.UsersModule,
            projects_module_1.ProjectsModule,
            lists_module_1.ListsModule,
            tasks_module_1.TasksModule,
            comments_module_1.CommentsModule,
            history_module_1.HistoryModule,
            workmeter_module_1.WorkmeterModule,
            mongoose_1.MongooseModule.forRoot('mongodb://admin:rappac33!@ds247357.mlab.com:47357/tmwm')
        ],
        controllers: [app_controller_1.AppController]
    })
], ApplicationModule);
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=app.module.js.map
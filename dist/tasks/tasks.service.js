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
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const tasks_schema_1 = require("./schema/tasks.schema");
const _ = require("underscore");
const moment = require("moment");
require("rxjs/add/observable/from");
require("rxjs/add/operator/map");
const comments_service_1 = require("../comments/comments.service");
const workmeter_service_1 = require("../workmeter/workmeter.service");
const websockets_1 = require("@nestjs/websockets");
const ObjectId = require('mongoose').Types.ObjectId;
_.mixin({
    compactObject: function (o) {
        _.each(o, function (v, k) {
            if (!v)
                delete o[k];
        });
        return o;
    }
});
let TasksService = class TasksService {
    constructor(taskModel, commentsService, workmeterService) {
        this.taskModel = taskModel;
        this.commentsService = commentsService;
        this.workmeterService = workmeterService;
    }
    addTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            if (task.taskDeadline)
                task.taskDeadline = moment(task.taskDeadline.formatted).endOf('day').utc();
            if (task.taskDraft)
                task.taskStatus = 'draft';
            let newTask = new this.taskModel(task);
            try {
                let task = yield newTask.save();
                this.server.emit('tasks', task);
                return task;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    allTasks(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                taskAssignedTo: params._id,
                taskDraft: false,
                taskStatus: { $ne: 'closed' }
            };
            let tasks = yield this.taskModel.find(query).sort({ created: -1 });
            return tasks;
        });
    }
    oneTask(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { _id: new ObjectId(params.id) };
            try {
                let oneTask = yield this.taskModel.findOne(query);
                if (!oneTask)
                    throw new common_1.HttpException('Task not found!', common_1.HttpStatus.BAD_REQUEST);
                return oneTask;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    updateTaskStatus(params) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pausedTask = null;
            if (params.taskDraft)
                throw new common_1.HttpException('This is a draft!', common_1.HttpStatus.BAD_REQUEST);
            if (!params.taskStarted) {
                let check = {
                    taskAssignedTo: params.taskAssignedTo,
                    taskStarted: true,
                    taskStatus: 'started',
                    taskDraft: false
                };
                let set = {
                    taskStarted: false,
                    taskStatus: 'paused',
                    taskModifiedBy: params.taskModifiedBy
                };
                try {
                    this.pausedTask = yield this.taskModel.findOneAndUpdate(check, set, { new: true });
                    if (this.pausedTask)
                        this.workmeterService.closeSession(params);
                }
                catch (e) {
                    throw new common_1.HttpException(e.message, common_1.HttpStatus.I_AM_A_TEAPOT);
                }
            }
            params.taskStarted = !params.taskStarted;
            params.taskStatus = params.taskStarted ? 'started' : 'paused';
            let query = {
                _id: new ObjectId(params._id),
                taskDraft: false
            };
            try {
                let startedTask = yield this.taskModel.findOneAndUpdate(query, params, { new: true });
                if (!startedTask)
                    throw new common_1.HttpException('Status not updated!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                if (startedTask.taskStarted) {
                    this.workmeterService.createSession(params);
                }
                else {
                    this.workmeterService.closeSession(params);
                }
                return { startedTask: startedTask, pausedTask: this.pausedTask };
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    updateTaskInfo(task) {
        return __awaiter(this, void 0, void 0, function* () {
            if (task.taskDeadline)
                task.taskDeadline = moment(task.taskDeadline.formatted).endOf('day').utc();
            if (task.taskDraft)
                task.taskStatus = 'draft';
            let query = { _id: new ObjectId(task._id) };
            let set = _.omit(task, '_id');
            try {
                let updatedTask = yield this.taskModel.findOneAndUpdate(query, set, { new: true });
                return updatedTask;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    assignTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { _id: new ObjectId(task._id) };
            let set = {
                taskAssignedTo: task.assignTo,
                taskStatus: task.assignStatus,
                taskStarted: false,
                taskModifiedBy: task.taskModifiedBy
            };
            try {
                let updatedTask = yield this.taskModel.findOneAndUpdate(query, set, { new: true });
                if (!_.isEmpty(task.assignComment)) {
                    let assignComment = {
                        commentDescription: task.assignComment,
                        commentTask: updatedTask._id,
                        created: task.assignCreated,
                        createdBy: updatedTask.taskModifiedBy
                    };
                    this.commentsService.addComment(assignComment);
                }
                if (updatedTask)
                    this.server.emit('assign', updatedTask);
                return updatedTask;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    markAsDone(task) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { _id: new ObjectId(task._id) };
            let set = _.omit(task, '_id');
            set.taskStarted = false;
            set.taskStatus = 'closed';
            try {
                let updatedTask = yield this.taskModel.findOneAndUpdate(query, set, { new: true });
                return updatedTask;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], TasksService.prototype, "server", void 0);
TasksService = __decorate([
    common_1.Component(),
    websockets_1.WebSocketGateway(),
    __param(0, mongoose_2.InjectModel(tasks_schema_1.TasksSchema)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        comments_service_1.CommentsService,
        workmeter_service_1.WorkmeterService])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map
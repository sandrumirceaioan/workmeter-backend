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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_decode = require("jwt-decode");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
const history_service_1 = require("../../history/history.service");
let MakeHistory = class MakeHistory {
    constructor(historyService) {
        this.historyService = historyService;
        this.indirectPaused = {};
        this.indirectComment = {};
        this.setAction = {};
    }
    intercept(req, context, stream$) {
        let token = req.headers['x-access-token'];
        let decoded = jwt_decode(token);
        this.setAction.historyUser = decoded._id;
        this.setAction.historyUserName = decoded.user;
        return stream$.map((data) => {
            switch (req.route.path) {
                case '/add':
                    this.setAction.historyTask = data._id;
                    this.setAction.historyAction = 'added task';
                    this.setAction.historyChange = data.taskAssignedTo;
                    this.historyService.saveAction(this.setAction);
                    break;
                case '/done':
                    this.setAction.historyTask = data._id;
                    this.setAction.historyAction = 'marked as done';
                    this.setAction.historyChange = data.taskStatus;
                    this.historyService.saveAction(this.setAction);
                    break;
                case '/addComment':
                    this.setAction.historyTask = data.commentTask;
                    this.setAction.historyAction = 'note added';
                    this.setAction.historyChange = data.commentDescription;
                    this.historyService.saveAction(this.setAction);
                    break;
                case '/updateStatus':
                    if (data.pausedTask) {
                        this.indirectPaused.historyUser = decoded._id;
                        this.indirectPaused.historyUserName = decoded.user;
                        this.indirectPaused.historyTask = data.pausedTask._id;
                        this.indirectPaused.historyAction = 'changed status';
                        this.indirectPaused.historyChange = 'paused';
                        this.historyService.saveAction(this.indirectPaused);
                    }
                    this.setAction.historyTask = req.body._id;
                    this.setAction.historyAction = 'changed status';
                    this.setAction.historyChange = req.body.taskStarted ? 'started' : 'paused';
                    this.historyService.saveAction(this.setAction);
                    break;
                case '/updateInfo':
                    this.setAction.historyTask = req.body._id;
                    this.setAction.historyAction = 'updated info';
                    this.setAction.historyChange = 'details';
                    this.historyService.saveAction(this.setAction);
                    break;
                case '/assignTask':
                    if (req.body.assignComment && req.body.assignComment != '') {
                        this.indirectComment.historyUser = decoded._id;
                        this.indirectComment.historyUserName = decoded.user;
                        this.indirectComment.historyTask = req.body._id;
                        this.indirectComment.historyAction = 'note added';
                        this.indirectComment.historyChange = req.body.assignComment;
                        this.historyService.saveAction(this.indirectComment);
                    }
                    this.setAction.historyTask = req.body._id;
                    this.setAction.historyAction = 'assigned task';
                    this.setAction.historyChange = data.taskAssignedTo;
                    this.historyService.saveAction(this.setAction);
                    break;
            }
            return data;
        }).catch((err) => {
            console.log(err);
            return Observable_1.Observable.throw(new common_1.HttpException('Exception interceptor message', common_1.HttpStatus.BAD_REQUEST));
        });
    }
};
MakeHistory = __decorate([
    common_1.Interceptor(),
    __metadata("design:paramtypes", [history_service_1.HistoryService])
], MakeHistory);
exports.MakeHistory = MakeHistory;
//# sourceMappingURL=history.interceptor.js.map
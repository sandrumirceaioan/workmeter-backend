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
const workmeter_schema_1 = require("./schema/workmeter.schema");
const _ = require("underscore");
const moment = require("moment");
require("rxjs/add/observable/from");
require("rxjs/add/operator/map");
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
let WorkmeterService = class WorkmeterService {
    constructor(workmeterModel) {
        this.workmeterModel = workmeterModel;
    }
    createSession(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let toSave = {
                workmeterTask: params._id,
                workmeterTaskStarted: true,
                workmeterCreatedBy: params.taskAssignedTo
            };
            let newSession = new this.workmeterModel(toSave);
            try {
                let session = yield newSession.save();
                return session;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    closeSession(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = {
                workmeterTaskStarted: true,
                workmeterCreatedBy: params.taskAssignedTo
            };
            let getSession = yield this.workmeterModel.findOne(check);
            if (!getSession)
                throw new common_1.HttpException('Can`t find task session!', common_1.HttpStatus.BAD_REQUEST);
            let now = moment.utc();
            let start = moment(getSession.workmeterCreated).utc();
            let duration = moment.duration(now.diff(start));
            let set = {
                workmeterTaskStarted: false,
                workmeterStoped: now,
                workmeterDuration: duration.asSeconds()
            };
            try {
                let stopSession = yield this.workmeterModel.update(check, set, { new: true });
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
            }
            return;
        });
    }
    hoursForOne(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { _id: new ObjectId(params.taskid) };
            try {
                let oneSession = yield this.workmeterModel.findOne(query);
                if (!oneSession)
                    return {
                        workmeterTask: params.taskid
                    };
                return oneSession;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    todayHours(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let totalSeconds = 0;
            let query = {
                workmeterTaskStarted: false,
                workmeterCreatedBy: params.userId,
                workmeterCreated: {
                    $gte: moment().startOf('day').utc(),
                    $lte: moment().endOf('day').utc()
                }
            };
            try {
                let allSessions = yield this.workmeterModel.find(query);
                if (allSessions.length == 0)
                    return 0;
                let length = allSessions.length;
                for (let i = 0; i < length; i++) {
                    totalSeconds += allSessions[i].workmeterDuration;
                }
                let check = {
                    workmeterTaskStarted: true,
                    workmeterCreatedBy: params.userId
                };
                let startedSession = yield this.workmeterModel.findOne(check);
                if (startedSession) {
                    let now = moment.utc();
                    let start = moment(startedSession.workmeterCreated).utc();
                    let duration = moment.duration(now.diff(start));
                    totalSeconds += duration.asSeconds();
                }
                return { seconds: totalSeconds, started: startedSession ? true : false };
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
WorkmeterService = __decorate([
    common_1.Component(),
    __param(0, mongoose_2.InjectModel(workmeter_schema_1.WorkmeterSchema)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], WorkmeterService);
exports.WorkmeterService = WorkmeterService;
//# sourceMappingURL=workmeter.service.js.map
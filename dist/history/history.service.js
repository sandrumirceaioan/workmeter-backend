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
const history_schema_1 = require("./schema/history.schema");
const _ = require("underscore");
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
let HistoryService = class HistoryService {
    constructor(historyModel) {
        this.historyModel = historyModel;
    }
    saveAction(pieceOfHistory) {
        return __awaiter(this, void 0, void 0, function* () {
            let newAction = new this.historyModel(pieceOfHistory);
            try {
                let hst = yield newAction.save();
                return hst;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    allForOne(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (params._id)
                query = { historyTask: params._id };
            let history = yield this.historyModel.find(query).sort({ created: 1 });
            return history;
        });
    }
};
HistoryService = __decorate([
    common_1.Component(),
    __param(0, mongoose_2.InjectModel(history_schema_1.HistorySchema)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], HistoryService);
exports.HistoryService = HistoryService;
//# sourceMappingURL=history.service.js.map
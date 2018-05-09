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
const lists_schema_1 = require("./schema/lists.schema");
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
let ListsService = class ListsService {
    constructor(listModel) {
        this.listModel = listModel;
    }
    addList(CreateListDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { listName: CreateListDto.listName };
            let checkList = yield this.listModel.findOne(query);
            if (checkList)
                throw new common_1.HttpException('List already exists!', common_1.HttpStatus.BAD_REQUEST);
            let newList = new this.listModel(CreateListDto);
            try {
                let list = yield newList.save();
                return list;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    allLists(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (params._id)
                query = { listProject: params._id };
            let lists = yield this.listModel.find(query).sort({ created: -1 });
            return lists;
        });
    }
    oneList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { _id: new ObjectId(params.id) };
            try {
                let oneProject = yield this.listModel.findOne(query);
                if (!oneProject)
                    throw new common_1.HttpException('List not found!', common_1.HttpStatus.BAD_REQUEST);
                return oneProject;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    updateList(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                _id: new ObjectId(params._id)
            };
            let set = _.compactObject(params);
            try {
                let updatedProject = yield this.listModel.findOneAndUpdate(query, set, { new: true });
                if (!updatedProject)
                    throw new common_1.HttpException('List not updated!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                return updatedProject;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    addDefaultList(list) {
        return __awaiter(this, void 0, void 0, function* () {
            let defaultList = new this.listModel(list);
            try {
                let list = yield defaultList.save();
                return list;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    deleteProjectLists(param) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { listProject: param._id };
            try {
                let deletedProject = yield this.listModel.remove(query);
                if (!deletedProject)
                    throw new common_1.HttpException('List not deleted!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                return deletedProject;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
ListsService = __decorate([
    common_1.Component(),
    __param(0, mongoose_2.InjectModel(lists_schema_1.ListsSchema)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ListsService);
exports.ListsService = ListsService;
//# sourceMappingURL=lists.service.js.map
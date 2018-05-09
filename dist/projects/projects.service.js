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
const projects_schema_1 = require("./schema/projects.schema");
const lists_service_1 = require("../lists/lists.service");
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
let ProjectsService = class ProjectsService {
    constructor(projectModel, listsService) {
        this.projectModel = projectModel;
        this.listsService = listsService;
    }
    addProject(createProjectDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { projectName: createProjectDto.projectName };
            let checkProject = yield this.projectModel.findOne(query);
            if (checkProject)
                throw new common_1.HttpException('Project already exists!', common_1.HttpStatus.BAD_REQUEST);
            let newProject = new this.projectModel(createProjectDto);
            try {
                let project = yield newProject.save();
                let list = yield this.listsService.addDefaultList({
                    listName: `${project.projectName} Default`,
                    listDescription: `Other ${project.projectName} Tasks`,
                    listProject: project._id
                });
                if (!list)
                    throw new common_1.HttpException('Default list not created!', common_1.HttpStatus.BAD_REQUEST);
                return project;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    allProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            let projects = yield this.projectModel.find().sort({ projectCreated: 1 });
            return projects;
        });
    }
    oneProject(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { _id: new ObjectId(params.id) };
            try {
                let oneProject = yield this.projectModel.findOne(query);
                if (!oneProject)
                    throw new common_1.HttpException('Project not found!', common_1.HttpStatus.BAD_REQUEST);
                return oneProject;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    updateProject(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {
                _id: new ObjectId(params._id)
            };
            let set = _.compactObject(params);
            try {
                let updatedProject = yield this.projectModel.findOneAndUpdate(query, set, { new: true });
                if (!updatedProject)
                    throw new common_1.HttpException('Project not updated!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                return updatedProject;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    deleteProject(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = { _id: new ObjectId(params._id) };
            try {
                let deletedProject = yield this.projectModel.findOneAndRemove(query);
                if (!deletedProject)
                    throw new common_1.HttpException('Project not deleted!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
                let deletedList = yield this.listsService.deleteProjectLists({ _id: deletedProject._id });
                if (!deletedList)
                    throw new common_1.HttpException('Lists not deleted!', common_1.HttpStatus.BAD_REQUEST);
                return deletedProject;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
};
ProjectsService = __decorate([
    common_1.Component(),
    __param(0, mongoose_2.InjectModel(projects_schema_1.ProjectsSchema)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        lists_service_1.ListsService])
], ProjectsService);
exports.ProjectsService = ProjectsService;
//# sourceMappingURL=projects.service.js.map
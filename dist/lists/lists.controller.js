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
const lists_service_1 = require("./lists.service");
const create_list_dto_1 = require("./dto/create-list.dto");
const auth_guard_1 = require("../common/guards/auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const sign_interceptor_1 = require("../common/interceptors/sign.interceptor");
let ListsController = class ListsController {
    constructor(listsService) {
        this.listsService = listsService;
    }
    add(CreateListDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.listsService.addList(CreateListDto);
        });
    }
    all(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.listsService.allLists(params);
        });
    }
    one(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.listsService.oneList(id);
        });
    }
    update(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.listsService.updateList(data);
        });
    }
};
__decorate([
    common_1.Post('/add'),
    roles_decorator_1.Roles('admin', 'manager'),
    common_1.UseInterceptors(sign_interceptor_1.Sign),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_list_dto_1.CreateListDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "add", null);
__decorate([
    common_1.Post('/all'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "all", null);
__decorate([
    common_1.Post('/one'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "one", null);
__decorate([
    common_1.Put('/update'),
    roles_decorator_1.Roles('admin', 'manager'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_list_dto_1.CreateListDto]),
    __metadata("design:returntype", Promise)
], ListsController.prototype, "update", null);
ListsController = __decorate([
    common_1.Controller('lists'),
    common_1.UseGuards(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [lists_service_1.ListsService])
], ListsController);
exports.ListsController = ListsController;
//# sourceMappingURL=lists.controller.js.map
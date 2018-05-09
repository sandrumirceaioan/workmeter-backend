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
const lists_controller_1 = require("./lists.controller");
const lists_service_1 = require("./lists.service");
const lists_schema_1 = require("./schema/lists.schema");
let ListsModule = class ListsModule {
};
ListsModule = __decorate([
    common_1.Module({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'lists', schema: lists_schema_1.ListsSchema }])],
        controllers: [lists_controller_1.ListsController],
        components: [lists_service_1.ListsService],
        exports: [lists_service_1.ListsService]
    })
], ListsModule);
exports.ListsModule = ListsModule;
//# sourceMappingURL=lists.module.js.map
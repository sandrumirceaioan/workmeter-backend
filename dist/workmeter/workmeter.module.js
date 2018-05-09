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
const workmeter_controller_1 = require("./workmeter.controller");
const workmeter_service_1 = require("./workmeter.service");
const workmeter_schema_1 = require("./schema/workmeter.schema");
let WorkmeterModule = class WorkmeterModule {
};
WorkmeterModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'hours', schema: workmeter_schema_1.WorkmeterSchema }])
        ],
        controllers: [workmeter_controller_1.WorkmeterController],
        components: [workmeter_service_1.WorkmeterService],
        exports: [workmeter_service_1.WorkmeterService]
    })
], WorkmeterModule);
exports.WorkmeterModule = WorkmeterModule;
//# sourceMappingURL=workmeter.module.js.map
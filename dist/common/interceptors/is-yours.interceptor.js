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
require("rxjs/add/observable/of");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
const jwt_decode = require("jwt-decode");
let IsYours = class IsYours {
    constructor() { }
    intercept(req, context, stream$) {
        let token = req.headers['x-access-token'];
        let decoded = jwt_decode(token);
        if (decoded.id != req.body.taskAssignedTo)
            throw new common_1.HttpException('Task not yours!', common_1.HttpStatus.FORBIDDEN);
        return stream$;
    }
};
IsYours = __decorate([
    common_1.Interceptor(),
    __metadata("design:paramtypes", [])
], IsYours);
exports.IsYours = IsYours;
//# sourceMappingURL=is-yours.interceptor.js.map
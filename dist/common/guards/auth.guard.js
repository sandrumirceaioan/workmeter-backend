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
const core_1 = require("@nestjs/core");
const jwt_decode = require("jwt-decode");
let AuthGuard = class AuthGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(req, context) {
        const token = req.headers['x-access-token'];
        if (!token)
            throw new common_1.HttpException('Token missing!', common_1.HttpStatus.BAD_REQUEST);
        var decodedToken = jwt_decode(token);
        const roles = this.reflector.get('roles', context.handler);
        if (!roles)
            return true;
        if (roles.indexOf(decodedToken.type) > -1) {
            return true;
        }
        else {
            throw new common_1.HttpException('Access denied!', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
AuthGuard = __decorate([
    common_1.Guard(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
require("rxjs/add/observable/of");
const jwt_decode = require("jwt-decode");
let Sign = class Sign {
    intercept(req, context, stream$) {
        let token = req.headers['x-access-token'];
        let decoded = jwt_decode(token);
        req.body.createdBy = decoded.id;
        return stream$;
    }
};
Sign = __decorate([
    common_1.Interceptor()
], Sign);
exports.Sign = Sign;
//# sourceMappingURL=sign.interceptor.js.map
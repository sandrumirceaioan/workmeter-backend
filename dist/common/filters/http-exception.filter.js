"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const error_module_1 = require("../errors/error.module");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(err, response) {
        if (err instanceof error_module_1.MessageCodeError) {
            response.setHeader('x-message-code-error', err.messageCode);
            response.setHeader('x-message', err.errorMessage);
            response.setHeader('x-httpStatus-error', err.httpStatus);
            return response.status(err.httpStatus).json({ statusCode: err.httpStatus, message: err.errorMessage });
        }
        else {
            return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(error_module_1.MessageCodeError, core_1.HttpException, Error)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map
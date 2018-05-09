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
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsString(), class_validator_1.MinLength(5),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userName", void 0);
__decorate([
    class_validator_1.IsString(), class_validator_1.IsEmail(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "emailAddress", void 0);
__decorate([
    class_validator_1.IsString(), class_validator_1.MinLength(5),
    __metadata("design:type", String)
], CreateUserDto.prototype, "invitationCode", void 0);
__decorate([
    class_validator_1.IsString(), class_validator_1.MinLength(8),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userType", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "created", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "token", void 0);
exports.CreateUserDto = CreateUserDto;
//# sourceMappingURL=create-user.dto.js.map
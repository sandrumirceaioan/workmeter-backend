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
class CreateTaskDto {
}
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskDescription", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskList", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskListName", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskProject", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskProjectName", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], CreateTaskDto.prototype, "taskDeadline", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateTaskDto.prototype, "taskStarted", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskStatus", void 0);
__decorate([
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateTaskDto.prototype, "taskDifficulty", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateTaskDto.prototype, "taskScored", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], CreateTaskDto.prototype, "taskDraft", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", Array)
], CreateTaskDto.prototype, "taskAttachments", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskModifiedBy", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "taskAssignedTo", void 0);
__decorate([
    class_validator_1.IsDate(),
    __metadata("design:type", Date)
], CreateTaskDto.prototype, "created", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateTaskDto.prototype, "createdBy", void 0);
exports.CreateTaskDto = CreateTaskDto;
//# sourceMappingURL=create-task.dto.js.map
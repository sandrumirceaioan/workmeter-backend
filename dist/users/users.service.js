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
const mongoose_1 = require("@nestjs/mongoose");
const users_schema_1 = require("./schema/users.schema");
const mongoose_2 = require("mongoose");
const md5 = require("md5");
const jwt = require("jwt-then");
const ObjectId = require('mongoose').Types.ObjectId;
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    registerUser(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            let orArray = [];
            orArray.push({ userName: { $regex: new RegExp("^" + createUserDto.userName + "$", "i") } });
            orArray.push({ emailAddress: { $regex: new RegExp("^" + createUserDto.emailAddress + "$") } });
            let filter = { $or: orArray };
            const salt = '4m0$pr4l3*s0!p3n~d3';
            const userType = 'user';
            const userCheck = yield this.userModel.findOne(filter);
            if (userCheck)
                throw new common_1.HttpException('User already registered!', 400);
            createUserDto.userType = userType;
            createUserDto.password = md5(createUserDto.password + salt);
            const newUser = new this.userModel(createUserDto);
            try {
                const user = yield newUser.save();
                return user;
            }
            catch (e) {
                throw new common_1.HttpException(e.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
    loginUser(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!params.userName || !params.password)
                throw new common_1.HttpException('Username and password required!', common_1.HttpStatus.BAD_REQUEST);
            let salt = '4m0$pr4l3*s0!p3n~d3';
            params.password = md5(params.password + salt);
            let loggedUser = yield this.userModel.findOne(params);
            if (!loggedUser)
                throw new common_1.HttpException('User not found!', common_1.HttpStatus.UNAUTHORIZED);
            const JWT = { KEY: 's0!p3n~d34m0$pr4l3*', ALGORITHMS: 'HS256' };
            let token = yield jwt.sign({
                id: loggedUser._id,
                user: loggedUser.userName,
                type: loggedUser.userType
            }, JWT.KEY, {
                algorithm: JWT.ALGORITHMS,
                expiresIn: 60 * 60 * 24
            });
            if (!token)
                throw new common_1.HttpException('Token could not be created!', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            loggedUser = loggedUser.toJSON();
            loggedUser.token = token;
            return loggedUser;
        });
    }
    checkLogged(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield jwt.verify(params.token, 's0!p3n~d34m0$pr4l3*');
                const logged = yield this.userModel.findOne({ _id: new ObjectId(token.id) });
                if (!logged)
                    throw new common_1.HttpException('Please log in to continue!', common_1.HttpStatus.UNAUTHORIZED);
                return logged;
            }
            catch (e) {
                if (e.name == 'TokenExpiredError')
                    throw new common_1.HttpException('Session expired!', common_1.HttpStatus.UNAUTHORIZED);
                if (e.name == 'JsonWebTokenError')
                    throw new common_1.HttpException('Token wrong or missing!', common_1.HttpStatus.UNAUTHORIZED);
                throw new common_1.HttpException(e, common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
    allUsers(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            let users = yield this.userModel.find(query).sort({ userName: -1 }).select({ "userName": 1, "_id": 1 });
            return users;
        });
    }
};
UsersService = __decorate([
    common_1.Component(),
    __param(0, mongoose_1.InjectModel(users_schema_1.UsersSchema)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map
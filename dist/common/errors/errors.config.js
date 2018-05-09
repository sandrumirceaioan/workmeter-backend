"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.errorMessagesConfig = {
    'user:create:missingInformation': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user with missing information.',
    },
    'user:create:missingFirstName': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without first name.',
    },
    'user:create:missingLastName': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without last name.',
    },
    'user:create:freeEmail': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Validation failed: Free email domains are not allowed.',
    },
    'user:create:missingEmail': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without email.',
    },
    'user:create:missingPassword': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user without password.',
    },
    'user:create:emailAlreadyExist': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new user with this email.',
    },
    'user:show:missingId': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to find the user caused by missing information.',
    },
    'user:update:missingInformation': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to update the user caused by missing information.',
    },
    'user:update:missingId': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to update the user caused by missing information.',
    },
    'user:delete:missingId': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to delete the user caused by missing information.',
    },
    'user:notFound': {
        type: 'notFound',
        httpStatus: common_1.HttpStatus.UNAUTHORIZED,
        errorMessage: 'Unable to find the user with the provided information.',
    },
    'request:unauthorized': {
        type: 'unauthorized',
        httpStatus: common_1.HttpStatus.UNAUTHORIZED,
        errorMessage: 'Access unauthorized.',
    },
    'request:malformedToken': {
        type: 'unauthorized',
        httpStatus: common_1.HttpStatus.UNAUTHORIZED,
        errorMessage: 'Bearer token malformed.',
    },
    'request:userNotFound': {
        type: 'unauthorized',
        httpStatus: common_1.HttpStatus.UNAUTHORIZED,
        errorMessage: 'User not found',
    },
    'request:missingToken': {
        type: 'unauthorized',
        httpStatus: common_1.HttpStatus.UNAUTHORIZED,
        errorMessage: 'Bearer token missing.',
    },
    'auth:login:missingEmail': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the user without email.',
    },
    'auth:login:missingPassword': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to connect the user without password.',
    },
    'table:create:missingInformation': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new car with missing information.',
    },
    'table:create:missingUserId': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new car without user id.',
    },
    'table:create:missingBrandName': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new car without brand name.',
    },
    'table:create:missingPurchaseDate': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to create a new car without purchase date.',
    },
    'table:show:missingId': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to find the car caused by missing information.',
    },
    'table:update:missingId': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to update the car caused by missing information.',
    },
    'table:notFound': {
        type: 'notFound',
        httpStatus: common_1.HttpStatus.NOT_FOUND,
        errorMessage: 'Unable to found the car with the provided information.',
    },
    'table:delete:missingId': {
        type: 'BadRequest',
        httpStatus: common_1.HttpStatus.BAD_REQUEST,
        errorMessage: 'Unable to delete the car caused by missing information.',
    },
};
//# sourceMappingURL=errors.config.js.map
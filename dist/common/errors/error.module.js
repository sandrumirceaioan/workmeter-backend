"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_config_1 = require("./errors.config");
class MessageCodeError extends Error {
    constructor(messageCode) {
        super();
        const errorMessageConfig = this.getMessageFromMessageCode(messageCode);
        if (!errorMessageConfig)
            throw new Error('Unable to find message code error.');
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.httpStatus = errorMessageConfig.httpStatus;
        this.messageCode = messageCode;
        this.errorMessage = errorMessageConfig.errorMessage;
    }
    getMessageFromMessageCode(messageCode) {
        let errorMessageConfig;
        Object.keys(errors_config_1.errorMessagesConfig).some(key => {
            if (key === messageCode) {
                errorMessageConfig = errors_config_1.errorMessagesConfig[key];
                return true;
            }
            return false;
        });
        if (!errorMessageConfig)
            throw new Error('Unable to find the given message code error.');
        return errorMessageConfig;
    }
}
exports.MessageCodeError = MessageCodeError;
//# sourceMappingURL=error.module.js.map
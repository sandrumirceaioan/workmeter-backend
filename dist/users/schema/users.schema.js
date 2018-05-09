"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongooseHidden = require("mongoose-hidden");
exports.UsersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: {
        type: String,
        unique: true
    },
    emailAddress: {
        type: String,
        unique: true
    },
    invitationCode: String,
    password: String,
    userType: String,
    userStatus: Number,
    created: {
        type: Date,
        default: function () { return new Date().getTime(); }
    }
}).plugin(mongooseHidden({
    defaultHidden: { password: true }
}));
//# sourceMappingURL=users.schema.js.map
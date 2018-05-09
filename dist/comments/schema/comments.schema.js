"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.CommentsSchema = new mongoose.Schema({
    commentDescription: String,
    commentTask: String,
    commentParent: String,
    commentModifiedBy: String,
    created: {
        type: Date,
        default: function () { return new Date().getTime(); }
    },
    createdBy: String,
});
//# sourceMappingURL=comments.schema.js.map
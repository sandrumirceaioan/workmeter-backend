"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.WorkmeterSchema = new mongoose.Schema({
    workmeterTask: String,
    workmeterTaskStarted: Boolean,
    workmeterDuration: {
        type: Number,
        default: 0
    },
    workmeterStoped: {
        type: Date
    },
    workmeterCreated: {
        type: Date,
        default: function () { return new Date().getTime(); }
    },
    workmeterCreatedBy: String
});
//# sourceMappingURL=workmeter.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.HistorySchema = new mongoose.Schema({
    historyTask: String,
    historyUser: String,
    historyUserName: String,
    historyAction: String,
    historyChange: String,
    created: {
        type: Date,
        default: function () { return new Date().getTime(); }
    }
});
//# sourceMappingURL=history.schema.js.map
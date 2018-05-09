"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ListsSchema = new mongoose.Schema({
    listName: String,
    listDescription: String,
    listProject: String,
    created: {
        type: Date,
        default: function () { return new Date().getTime(); }
    },
    createdBy: String
});
//# sourceMappingURL=lists.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ProjectsSchema = new mongoose.Schema({
    projectName: String,
    projectDescription: String,
    projectCategory: String,
    projectTags: String,
    projectOwner: String,
    created: {
        type: Date,
        default: function () { return new Date().getTime(); }
    },
    createdBy: String
});
//# sourceMappingURL=projects.schema.js.map
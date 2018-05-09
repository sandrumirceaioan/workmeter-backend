"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.TasksSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    taskList: String,
    taskListName: String,
    taskProject: String,
    taskProjectName: String,
    taskDeadline: Date,
    taskStarted: {
        type: Boolean,
        default: false
    },
    taskStatus: {
        type: String,
        default: 'new'
    },
    taskDifficulty: {
        type: Number,
        default: null
    },
    taskScored: {
        type: Boolean,
        default: false
    },
    taskDraft: {
        type: Boolean,
        default: false
    },
    taskAttachments: [],
    taskModifiedBy: String,
    taskAssignedTo: String,
    created: {
        type: Date,
        default: function () { return new Date().getTime(); }
    },
    createdBy: String,
});
//# sourceMappingURL=tasks.schema.js.map
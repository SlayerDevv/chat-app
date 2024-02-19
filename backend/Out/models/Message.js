"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    user: String,
    text: String,
    timestamp: { type: Date, default: Date.now }
});
const MessageModel = (0, mongoose_1.model)('Message', MessageSchema);
exports.Message = MessageModel;

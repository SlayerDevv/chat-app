"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
function connectDB() {
    try {
        mongoose_1.default.connect("mongodb+srv://slayer:123Qsd56&&&&@oddygames.yfnpr7l.mongodb.net/?retryWrites=true&w=majority");
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.log(err);
    }
}
exports.connectDB = connectDB;

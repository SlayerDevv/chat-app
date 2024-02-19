"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
function connectDB() {
    try {
        mongoose_1.default.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    }
    catch (err) {
        console.log(err);
    }
}
exports.connectDB = connectDB;

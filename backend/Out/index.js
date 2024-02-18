"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = (0, express_1.default)();
require('dotenv').config();
const server = (0, http_1.createServer)(app);
const db_1 = require("./utils/db");
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    }
});
app.use(express_1.default.json());
(0, db_1.connectDB)();
app.get('/', (req, res) => {
});
server.listen(5001, () => {
    console.log('Server running on port 5001');
});

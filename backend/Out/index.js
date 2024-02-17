"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    }
});
app.use(express_1.default.json());
app.get('/', (req, res) => {
    let words = ['zebi', 'nemi', 'n9ch', '3tay'];
    let random = words[Math.floor(Math.random() * words.length)];
    function randomm() {
        setTimeout(() => {
            res.send(random);
        }, 2000);
    }
    randomm();
});
server.listen(5001, () => {
    console.log('Server running on port 5001');
});

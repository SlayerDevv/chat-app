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
const Message_1 = require("./models/Message");
const db_1 = require("./utils/db");
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://105.110.219.200:3000",
    }
});
app.use(express_1.default.json());
(0, db_1.connectDB)();
app.get('/', (req, res) => {
    res.send('Works');
});
io.on('connection', (socket) => {
    console.log('User connected', socket.id);
    socket.on('chat message', (data) => {
        socket.broadcast.emit('chat message', data.message);
        console.log('Received message', data);
        const message = new Message_1.Message({ user: data.user, text: data.message });
        message.save().then(() => {
            console.log('Message Saved To Database');
        }).catch((err) => { console.log(err); });
    });
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});
server.listen(5001, () => {
    console.log(`Server running on port 5001`);
});

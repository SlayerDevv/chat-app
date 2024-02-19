import express, { Request, Response } from 'express';
import { Server } from 'socket.io'
import { createServer } from 'http'
const app = express();
require('dotenv').config();
const server = createServer(app);
import { Message } from './models/Message'
import { connectDB } from './utils/db'
const io = new Server(server, {
    cors: {
        origin: "http://105.110.219.200:3000",
    }
});
app.use(express.json());
connectDB()
app.get('/', (req: Request, res: Response) => {
    res.send('Works')
})

io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('chat message', (data) => {
        socket.broadcast.emit('chat message', data.message)
        console.log('Received message', data);
        const message = new Message({ user: data.user, text: data.message });
        message.save().then(() => {
            console.log('Message Saved To Database')
        }).catch((err) => { console.log(err) })

    })


    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
})

server.listen(5001, () => {
    console.log(`Server running on port 5001`);
});




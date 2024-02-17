import express, {Request, Response} from 'express';
import {Server} from 'socket.io'
import {createServer} from 'http'
const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",   
    }
});
app.use(express.json());

    app.get('/', (req: Request, res: Response) => {

    });

    


server.listen(5001, () => {
    console.log('Server running on port 5001');
})
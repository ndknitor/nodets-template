import { Server } from 'socket.io';
import { createServer } from 'http';
import server from './server';

const io = new Server(createServer(server));
io.on("connection", socket => {
    socket.emit("hello", "asdasdasdasd");
});

export default io; 
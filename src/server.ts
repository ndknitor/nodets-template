import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import userRouter from './api/user.router';

const server = express();
const io = new Server(createServer(server));

server.use(bodyParser.json());
server.use(cors());

server.use('/api/users', userRouter);

export { io, server };
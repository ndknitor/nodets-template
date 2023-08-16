import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './api/user.router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { HttpStatusCode } from './libs/enums/HttpStatusCode';
import Logging from './middlewares/sys/Logging';

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(Logging);

server.use('/api/users', userRouter);

server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use("*", (req, res) => {
    res.status(HttpStatusCode.NotFound).send({ message: "End point not found" });
});


export default server;
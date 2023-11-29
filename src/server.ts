import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './api/user.router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { HttpStatusCode } from './libs/enums/HttpStatusCode';
import Logging from './middlewares/sys/Logging';
import expressWs from 'express-ws';

const ews = expressWs(express());
const app = ews.app;
app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(cors());
// app.use(Logging);

app.use('/api/users', userRouter);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.ws("/socket", (ws, req) => {
    
})

app.use("*", (req, res) => {
    res.status(HttpStatusCode.NotFound).send({ message: "End point not found" });
});

export default app;
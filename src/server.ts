import express from 'express';
import bodyParser from 'body-parser';
import seatController from './controllers/api/seat.controller';
import Authorization from '../libs/middlewares/Authorization';
import Logging from '../libs/middlewares/Logging';
import userController from './controllers/api/user.controller';

const app = express();
app.disable("x-powered-by");


app.use(bodyParser.json());
app.use(Logging);

app.use("/api/seats", seatController);
app.use("/api/users", userController);

// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("*", (req, res) => {
    res.status(404).send();
});

export default app;

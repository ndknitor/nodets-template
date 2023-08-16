import { Request, Response, Router } from "express";
import SignInRequest from "../requests/SignInRequest";
import Validation from "../middlewares/sys/Validation";
import { createDatabaseConnection } from "../data-source";
import handleRequest from "../libs/functions";

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
    await handleRequest(res, async () => {
        const connection = await createDatabaseConnection();
        //const users = await connection.manager.find(SysTblUser, { where: { userName: ILike("%kn%") } });
        //connection.destroy();
        //res.json({ users: users });
        //console.log(connection);
        res.json({ date: new Date() });
    });
});
userRouter.post('/submit', Validation(SignInRequest), (req, res) => {
    // If validation passes, this route handler will be executed
    res.json({ message: 'Request validated successfully' });
});

userRouter.get('/profile', (req: Request, res: Response) => {
    // Handle the route logic here
    res.json({ message: 'This is the user profile route' });
});


export default userRouter;
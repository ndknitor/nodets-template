import { Request, Response, Router } from "express";
import SignInRequest from "../requests/SignInRequest";
import Validation from "../middlewares/sys/Validation";

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
    // Handle the route logic here
    //const connection = await createDatabaseConnection();
    //const users = await connection.manager.find(SysTblUser, { where: { userName: ILike("%kn%") } });
    //connection.destroy();
    //res.json({ users: users });
    res.json({ users: "xzcxzczx" });
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
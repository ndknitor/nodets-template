import { Request, Response, Router } from "express";
import { createDatabaseConnection } from "../data-source";
import { ILike } from "typeorm";

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
    // Handle the route logic here
    const connection = await createDatabaseConnection();
    //const users = await connection.manager.find(SysTblUser, { where: { userName: ILike("%kn%") } });
    connection.destroy();
    //res.json({ users: users });
    res.json({ users: "xzcxzczx" });
});

userRouter.get('/profile', (req: Request, res: Response) => {
    // Handle the route logic here
    res.json({ message: 'This is the user profile route' });
});


export default userRouter;
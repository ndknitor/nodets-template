import { Request, Response, Router } from "express";
import SignInRequest from "../requests/SignInRequest";
import Validation from "../middlewares/sys/Validation";
import handleRequest from "../libs/functions";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response) => {
    await handleRequest(res, async () => {
        const seats = await prisma.seat.findMany({ where: { Deleted: false }, orderBy: { BusId: "desc" } });
        res.json({seats : seats});
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
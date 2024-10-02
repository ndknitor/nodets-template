import { Router } from "express";
import SignInRequest from "../../requests/SignInRequest";
import handleRequest from "../../../libs/functions";
import Validation from "../../../libs/middlewares/Validation";
import jwt from 'jsonwebtoken';

const userController = Router();

userController.route("/validate").post(
    (request, response) => {
        handleRequest(response, async () => {
            response.json({ message: 'Request validated successfully' });
        });
    });

userController.route("/admin").get(
    // @ts-ignore
    Authorization(["Admin"]),
    (request, response) => {
        response.json({ message: 'This is an admin endpoint' });
    }
);

userController.route("/user").get(
    // @ts-ignore
    Authorization(["User"]),
    (request, response) => {
        response.json({ message: 'This is an user endpoint' });
    }
);

userController.route("/signin").post(
    (request, response) => {
        handleRequest(response, () => {
            const secret = process.env.JWT_SECRET;
            const options = {
                expiresIn: '1h',
            };
            const payload = {
                id: request.body.id,
                role: request.body.role
            };
            const token = jwt.sign(payload, secret, options);
            response.json({ message: "Authorize successfully", jwtToken: token });
        });
    }
)
export default userController;
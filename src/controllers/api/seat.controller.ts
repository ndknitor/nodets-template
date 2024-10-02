import { Router } from "express";
import AppDataSource from "../../../data-source";
import { Seat } from "../../entities/Seat";
import handleRequest from "../../../libs/functions";

const seatController = Router();

seatController.route("/").get(
    // @ts-ignore
    //ResponseCache(1),
    async (request, response) => {
        handleRequest(response, async () => {
            const seats = await AppDataSource.manager.getRepository(Seat).find({ order: { seatId: "DESC" }, where: { deleted: false } });
            response.json({ seats: seats });
        });
    });



export default seatController;
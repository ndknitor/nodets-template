import { configDotenv } from "dotenv";
import { server } from "./server";
import { logger } from "./middlewares/sys/Logging";
import { NODE_ENV } from "./env";
configDotenv();
const port = parseInt(process.env["HOST_PORT"]) || 3000;
process.on('uncaughtException', function (error) {
    logger.error(error.stack);
});
console.log(NODE_ENV);

server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

// import { AppDataSource } from "./data-source"
// import { User } from "./entity/User"

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))

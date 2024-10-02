import { DataSource } from "typeorm"
import { Ticket } from "./src/entities/Ticket";
import { Seat } from "./src/entities/Seat";
import { Bus } from "./src/entities/Bus";
import { Route } from "./src/entities/Route";
import { Trip } from "./src/entities/Trip";
import { User } from "./src/entities/User";

const AppDataSource = new DataSource({
    type: "mssql",
    // url: process.env.DATABASE_URL,
    host: "ndkn",
    port: 1433,
    username: "sa",
    password: "12345678@Abc",
    database: "Etdb",
    options: {
        trustServerCertificate : true
    },
    entities: [Ticket, Seat, Bus, Route, Trip, User]
})

export default AppDataSource;
import "reflect-metadata"
import { DataSource } from "typeorm"

export const createDatabaseConnection = async () => await (new DataSource({
    type: "mssql",
    host: process.env["DB_HOST"],
    username: process.env["DB_USERNAME"],
    password: process.env["DB_PASSWORD"],
    database: process.env["DB_NAME"],
    port: parseInt(process.env["DB_PORT"]),
    synchronize: false,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: [],
    subscribers: [],
    extra: {
        trustServerCertificate: true
    }
}).initialize());

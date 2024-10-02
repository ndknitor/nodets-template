import { configDotenv } from "dotenv";
import AppDataSource from "./data-source";
import app from "./src/server";
configDotenv();
const port = parseInt(process.env["HOST_PORT"]) || 3000;
AppDataSource.initialize();
app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
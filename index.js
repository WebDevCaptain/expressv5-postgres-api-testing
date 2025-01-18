import { config } from "dotenv";

const ENVIRONMENT = process.env.NODE_ENV || "development";

config({
  path: `${ENVIRONMENT}.env`,
}); // Load env variables in .env file

const APP_PORT = process.env.APP_PORT || 3000;

import buildApp from "./src/app.js";
import pool from "./src/pool.js";

const app = buildApp();

pool
  .connect({
    host: process.env.BOOKS_PG_HOST,
    port: process.env.BOOKS_PG_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  })
  .then(() => {
    app.listen(APP_PORT, async () => {
      console.log(
        `Server is running on PORT ${APP_PORT} in ${ENVIRONMENT} mode`
      );
    });
  })
  .catch((err) => {
    console.error("Something went wrong while starting the app", err);
  });

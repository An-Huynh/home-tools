import express, { Express } from "express";
import dotenv from "dotenv";
import dataSource from "./src/db/data-source";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

dataSource.initialize().then((db) => {
  console.log(`[Server]: Successfully connected to DB ${db.options.database} `);
}).catch(err => {
  console.log(`[Server]: Error during data source initialization:`, err);
});

const app: Express = express();
const port: Number = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`[Server]: Server is running at https://localhost:${port}`);
});

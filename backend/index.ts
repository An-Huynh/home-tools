import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const app: Express = express();
const port: Number = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

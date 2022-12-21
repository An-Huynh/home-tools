import express, { Express } from "express";
import dotenv from "dotenv";
import passport from "passport";
import { localStrategy } from "./src/config/passport";
import { authRouter } from "./src/routes";
import { errorHandler } from "./src/middleware/error";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

passport.use("local", localStrategy);

const app: Express = express();
const port: Number = Number(process.env.PORT);

app.use(express.json());

app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});

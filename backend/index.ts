import express, { Express } from "express";
import passport from "passport";
import { localStrategy } from "./src/config/passport";
import { authRouter } from "./src/routes";
import { errorHandler } from "./src/middleware/error";

passport.use("local", localStrategy);

const app: Express = express();
const PORT = 3000;

app.use(express.json());

app.use("/auth", authRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Server]: Server is running at http://localhost:${PORT}`);
});

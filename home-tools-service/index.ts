import express, { Express } from "express";
import passport from "passport";
import { localStrategy, jwtStrategy } from "./src/config/passport";
import { authRouter, homeRouter } from "./src/routes";
import { errorHandler } from "./src/middleware/error";
import swaggerUI from "swagger-ui-express";
import { User as UserModel } from "./src/db/models/user.model";
import swaggerSpec from "./src/config/swagger";
import { corsHandler } from "./src/middleware/cors";
import { userRouter } from "./src/routes/user-routes";

// TODO: Move this somewhere else?
declare global {
  namespace Express {
    interface User extends UserModel {}
  }
}

passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

const app: Express = express();
const PORT = 3000;

app.use(express.json());

app.use(corsHandler);

app.use("/auth", authRouter);
app.use("/home", homeRouter);
app.use("/user", userRouter);

if (process.env.NODE_ENV !== "production") {
  app.use("/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Server]: Server is running at http://localhost:${PORT}`);
});

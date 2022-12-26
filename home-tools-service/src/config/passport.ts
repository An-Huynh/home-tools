import { Strategy as LocalStrategy } from "passport-local";
import {
  Strategy as JWTStrategy,
  VerifiedCallback,
  ExtractJwt,
} from "passport-jwt";
import { User } from "../db/models/user.model";
import DataSource from "../db/data-source";
import { compare } from "bcrypt";

const userRepository = DataSource.getRepository(User);

const localStrategy: LocalStrategy = new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await userRepository.findOneBy({ emailAddress: username });
      if (!user) {
        return done(null, null, { message: `Incorrect username or password.` });
      }
      if (await compare(password, user.password.toString())) {
        return done(null, user, { message: "Logged in successfully." });
      }
      return done(null, null, { message: "Incorrect username or password." });
    } catch (error) {
      return done(error);
    }
  }
);

const accessTokenStrategy: JWTStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET,
  },
  async (payload: any, done: VerifiedCallback) => {
    try {
      const user = await userRepository.findOneBy({
        id: payload.userId,
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }
);

const refreshTokenStrategy: JWTStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.REFRESH_TOKEN_SECRET,
  },
  async (payload: any, done: VerifiedCallback) => {
    try {
      const user = await userRepository.findOneBy({
        id: payload.userId,
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }
);

export { localStrategy, accessTokenStrategy, refreshTokenStrategy };

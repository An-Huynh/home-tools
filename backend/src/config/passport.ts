import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../db/models/user.model";
import DataSource from "../db/data-source";
import { compare } from "bcrypt";

const userRepository = DataSource.getRepository(User);

const localStrategy: LocalStrategy = new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await userRepository.findOneBy({ emailAddress: username });
      if (!user) {
        return done(null, null, { message: `User '${username}' not found.` });
      }
      if (await compare(password, user.password.toString())) {
        return done(null, user, { message: "Logged in successfully." });
      }
      return done(null, null, { message: "Incorrect password." });
    } catch (error) {
      return done(error);
    }
  }
);

export { localStrategy };

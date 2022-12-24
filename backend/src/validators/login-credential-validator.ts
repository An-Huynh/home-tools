import { checkSchema } from "express-validator";

const loginCredentialValidator = checkSchema({
  username: {
    in: ["body"],
    isString: {
      errorMessage: "Username must be a string",
    },
    exists: {
      errorMessage: "Username is required",
    },
    isLength: {
      errorMessage: "Username cannot be empty",
      options: {
        min: 1,
      },
    },
  },
  password: {
    in: ["body"],
    isString: {
      errorMessage: "Password must be a string",
    },
    exists: {
      errorMessage: "Password is required",
    },
    isLength: {
      errorMessage: "Password cannot be empty",
      options: {
        min: 1,
      },
    },
  },
});

export { loginCredentialValidator };

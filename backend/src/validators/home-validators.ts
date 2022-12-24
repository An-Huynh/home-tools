import { checkSchema } from "express-validator";

const getHomeValidator = checkSchema({
  ownerId: {
    in: ["query"],
    isUUID: true,
  },
  page: {
    in: ["query"],
    isInt: {
      options: {
        gt: 0,
      },
    },
  },
  pageSize: {
    in: ["query"],
    isInt: {
      options: {
        gt: 0,
      },
    },
  },
});

const addHomeValidator = checkSchema({
  name: {
    in: ["body"],
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 255,
      },
    },
  },
  ownerId: {
    in: ["body"],
    isUUID: true,
  },
});

export { getHomeValidator, addHomeValidator };

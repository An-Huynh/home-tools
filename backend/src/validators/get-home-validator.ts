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

export { getHomeValidator };

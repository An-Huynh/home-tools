import Joi from "joi";

const getHomeRequestSchema = Joi.object().keys({
  query: {
    ownerId: Joi.string().uuid().required(),
    page: Joi.number().integer().greater(0).required(),
    pageSize: Joi.number().integer().greater(0).required(),
  },
});

const addHomeRequestSchema = Joi.object().keys({
  body: {
    name: Joi.string().min(1).max(255).required(),
    ownerId: Joi.string().uuid().required(),
  },
});

const deleteHomeRequestSchema = Joi.object().keys({
  params: {
    id: Joi.string().uuid().required(),
  },
});

const updateHomeRequestSchema = Joi.object().keys({
  params: {
    id: Joi.string().uuid().required(),
  },
  body: {
    name: Joi.string().min(1).max(255).required(),
    ownerId: Joi.string().uuid().required(),
    id: Joi.string()
      .equal(Joi.ref("...params.id"))
      .required()
      .messages({ "any.only": '"body.id" must be equal to "param.id"' }),
  },
});

export {
  getHomeRequestSchema,
  addHomeRequestSchema,
  updateHomeRequestSchema,
  deleteHomeRequestSchema,
};

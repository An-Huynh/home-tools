import Joi from "joi";

const getUserRequestSchema = Joi.object().keys({
  params: {
    id: Joi.string().uuid().required(),
  },
});

export { getUserRequestSchema };

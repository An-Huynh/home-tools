import Joi from "joi";

const loginCredentialSchema = Joi.object().keys({
  body: {
    username: Joi.string().min(1).required(),
    password: Joi.string().min(1).required(),
  },
});

export { loginCredentialSchema };

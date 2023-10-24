import Joi from 'joi';

const registerSchema = Joi.object({
  firstname: Joi.string().min(1).max(255).required(),
  lastname: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(1).max(255).required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
    .required(),
  birth_date: Joi.date().required(),
  gender: Joi.string().valid('Homme', 'Femme').required(),
  profile_picture: Joi.string().uri().allow(null, ''),
  profile_desc: Joi.string().max(500).allow(null, ''),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { registerSchema, loginSchema };

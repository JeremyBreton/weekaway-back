import Joi from 'joi';

const registerSchema = Joi.object({
  firstname: Joi.string().min(1).max(255).required(),
  lastname: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().required(),
  address: Joi.string().min(1).max(255),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
    .required(),
  birth_date: Joi.date(),
  gender: Joi.string().valid('Homme', 'Femme'),
  profile_picture: Joi.string().uri().allow(null, ''),
  profile_desc: Joi.string().max(500).allow(null, ''),
});

const eventSchema = Joi.object({
  // for Events :
  name: Joi.string().required(),
  ownerId: Joi.number().required(),
  status: Joi.boolean().required(),
  description: Joi.string().required(),
  picture: Joi.string().required(),
  linkProject: Joi.string().required(),
  password: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userChoiceSchema = Joi.object({
  startDate: Joi.required(),
  endDate: Joi.required(),
  eventId: Joi.number().required(),
  userId: Joi.number().required(),
});

const themeSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  theme_id: Joi.number().integer().positive().required(),
});

const UserGestionSchema = Joi.object({
  firstname: Joi.string().min(1).max(255),
  lastname: Joi.string().min(1).max(255),
  email: Joi.string().email(),
  address: Joi.string().min(1).max(255),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/),
  birth_date: Joi.date(),
  gender: Joi.string().valid('Homme', 'Femme'),
  profile_picture: Joi.string().uri().allow(null, ''),
  profile_desc: Joi.string().max(500).allow(null, ''),
});

const eventDateSchema = Joi.object({
  event_id: Joi.number().integer().positive().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
});

export {
  registerSchema,
  loginSchema,
  eventSchema,
  themeSchema,
  userChoiceSchema,
  UserGestionSchema,
  eventDateSchema,
};

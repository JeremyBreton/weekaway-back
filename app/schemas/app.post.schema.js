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
  name: Joi.string().required(),
  owner_id: Joi.number().required(),
  status: Joi.boolean().required(),
  description: Joi.string(),
  // ! Resolution temporaires des problèmes de date (error : StartDate is not allowed)
  startDate: Joi.date(),
  endDate: Joi.date(),
  datesOfEvent: Joi.object(),
  theme: Joi.string(),
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

const userHasEventSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
  event_id: Joi.number().integer().positive().required(),
});

export {
  registerSchema,
  loginSchema,
  eventSchema,
  userChoiceSchema,
  UserGestionSchema,
  eventDateSchema,
  userHasEventSchema,
};

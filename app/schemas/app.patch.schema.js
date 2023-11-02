import Joi from 'joi';

const registerSchema = Joi.object({
  firstname: Joi.string().min(1).max(255),
  lastname: Joi.string().min(1).max(255).,
  email: Joi.string().email().,
  address: Joi.string().min(1).max(255),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
    .,
  birth_date: Joi.date(),
  gender: Joi.string().valid('Homme', 'Femme'),
  profile_picture: Joi.string().uri().allow(null, ''),
  profile_desc: Joi.string().max(500).allow(null, ''),
});

const eventSchema = Joi.object({
  name: Joi.string().,
  ownerId: Joi.number().,
  status: Joi.boolean().,
  description: Joi.string(),
  // ! Resolution temporaires des problèmes de date (error : StartDate is not allowed)
  startDate: Joi.date(),
  endDate: Joi.date(),
  datesOfEvent: Joi.object(),
  theme: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
});

const userChoiceSchema = Joi.object({
  startDate: Joi.string(),
  endDate: Joi.string(),
  eventId: Joi.number(),
  userId: Joi.number(),
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
  event_id: Joi.number().integer().positive(),
  start_date: Joi.date(),
  end_date: Joi.date(),
});

export {
  registerSchema,
  loginSchema,
  eventSchema,
  userChoiceSchema,
  UserGestionSchema,
  eventDateSchema,
};

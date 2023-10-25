import Joi from 'joi';

export default Joi.object({
  // for Events :
  name: Joi.string().required(),
  owner_id: Joi.number().required(),
  status: Joi.boolean().required(),
  description: Joi.string().required(),
  picture: Joi.string().required(),
  link_project: Joi.string().required(),

});

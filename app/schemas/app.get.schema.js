import Joi from 'joi';

export default Joi.object({
  id: Joi.number().max(5),
})
  .required();

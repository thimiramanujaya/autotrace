import Joi from 'joi';

export const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(30).required(),
  displayName: Joi.string().optional(),
  phone: Joi.string().pattern(/^[0-9]+$/).required(),
}).required();

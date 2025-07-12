import Joi from 'joi';

export const scrapeRequestSchema = Joi.object({
  url: Joi.string().uri().required()
});

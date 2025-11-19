const Joi = require('joi');
const createLinkSchema = Joi.object({
  url: Joi.string()
    .uri()
    .required()
    .messages({
      'string.uri': 'Invalid URL format',
      'any.required': 'URL is required'
    }),
    
  code: Joi.string()
    .alphanum()
    .min(6)
    .max(8)
    .allow('') 
    .optional()
    .messages({
      'string.alphanum': 'Code must be alphanumeric',
      'string.min': 'Code must be at least 6 characters',
      'string.max': 'Code must be at most 8 characters'
    })
});
module.exports=createLinkSchema;
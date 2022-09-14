import Joi from 'joi';
import Login from '../interfaces/ILogin';
import Products from '../interfaces/IProducts';

const MESSAGE_USERNAME = '"username" is required';
const MESSAGE_USERNAME_EMPTY = '"username" is not empty';
const MESSAGE_PASSWORD = '"password" is required';
const MESSAGE_PASSWORD_EMPTY = '"password" is required';

const validateLogin = (dados: Login): Login => {
  const user = Joi.object({
    username: Joi.string().required().messages({
      'any.required': `400|${MESSAGE_USERNAME}`,
      'string.empty': `400|${MESSAGE_USERNAME_EMPTY}`,
    }),

    password: Joi.string().required().messages({
      'any.required': `400|${MESSAGE_PASSWORD}`,
      'string.empty': `400|${MESSAGE_PASSWORD_EMPTY}`,
    }),
  });

  const { error, value } = user.validate(dados);

  if (error) {
    throw error;
  }
  return value;
};

const validateProducts = (body: Products): Products => {
  const products = Joi.object({
    name: Joi.string().required().min(3).messages({
      'any.required': '400|"name" is required',
      'string.base': '422|"name" must be a string',
      'string.min': '422|"name" length must be at least 3 characters long',
    }),

    amount: Joi.string().required().min(3).messages({
      'any.required': '400|"amount" is required',
      'string.base': '422|"amount" must be a string',
      'string.min': '422|"amount" length must be at least 3 characters long',
    }),

  });

  const { error, value } = products.validate(body);
  console.log(error);
  
  if (error) {
    throw error;
  }
  return value;
};

export = { validateLogin, validateProducts };

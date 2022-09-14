import Joi from 'joi';
import Login from '../interfaces/ILogin';
import Products from '../interfaces/IProducts';
import User from '../interfaces/IUser';

const MESSAGE_USERNAME = '"username" is required';
const MESSAGE_USERNAME_EMPTY = '"username" is not empty';
const MESSAGE_PASSWORD = '"password" is required';
const MESSAGE_PASSWORD_EMPTY = '"password" is required';

const validateLogin = (dados: Login): Login => {
  const user = Joi.object({
    username: Joi.string().required().messages({
      'any.required': `400|${MESSAGE_USERNAME}`,
      'string.base': `400|${MESSAGE_USERNAME_EMPTY}`,
    }),

    password: Joi.string().required().messages({
      'any.required': `400|${MESSAGE_PASSWORD}`,
      'string.base': `400|${MESSAGE_PASSWORD_EMPTY}`,
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

const ObjectUser = {
  username: Joi.string().required().min(3).messages({
    'any.required': '400|"username" is required',
    'string.empty': '400|"username" is not empty',
    'string.base': '422|"username" must be a string',
    'string.min': '422|"username" length must be at least 3 characters long',
  }),

  classe: Joi.string().required().min(3).messages({
    'any.required': '400|"classe" is required',
    'string.empty': '400|"classe" is not empty',
    'string.base': '422|"classe" must be a string',
    'string.min': '422|"classe" length must be at least 3 characters long',
  }),

  level: Joi.number().required().greater(0).messages({
    'any.required': '400|"level" is required',
    'number.base': '422|"level" must be a number',
    'number.greater': '422|"level" must be greater than or equal to 1',
  }),

  password: Joi.string().required().min(8).messages({
    'any.required': '400|"password" is required',
    'string.empty': '400|"password" is not empty',
    'string.base': '422|"password" must be a string',
    'string.min': '422|"password" length must be at least 8 characters long',
  }),
};

const validateUsers = (body: User): User => {
  const products = Joi.object(ObjectUser);

  const { error, value } = products.validate(body);
    
  if (error) {
    throw error;
  }

  return value;
};

export = { 
  validateLogin, 
  validateProducts,
  validateUsers,
};

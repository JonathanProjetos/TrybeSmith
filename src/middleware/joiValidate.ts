import Joi from 'joi';
import Login from '../interfaces/ILogin';

const validateLogin = (dados: Login): Login => {
  const user = Joi.object({
    username: Joi.string().required().messages({
      'any.required': '400|"username" is required',
      'string.empty': '400|"username" is not empty',
    }),

    password: Joi.string().required().messages({
      'any.required': '400|"password" is required',
      'string.empty': '400|"password" is required',
    }),
  });

  const { error, value } = user.validate(dados);

  if (error) {
    throw error;
  }
  return value;
};

export default validateLogin;

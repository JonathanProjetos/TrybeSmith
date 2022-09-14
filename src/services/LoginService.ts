import connection from '../models/connection';
import Login from '../interfaces/ILogin';
import LoginModel from '../models/LoginModels';
import jwtTokenLogin from '../middleware/tokenLogin';
import joi from '../middleware/joiValidate';

class LoginServices {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async Login(body: Login): Promise<string> {
    const check = joi.validateLogin(body);
    const { username, password } = check;

    const result = await this.model.getByBody(username, password);
    
    if (result.length === 0) {
      throw new Error('401|Username or password invalid');
    }

    const token = jwtTokenLogin.generateTokenLogin(username, password);

    return token as string;
  }
}

export default LoginServices;
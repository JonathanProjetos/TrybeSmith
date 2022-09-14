import connection from '../models/connection';
import User from '../interfaces/IUser';
import UserModel from '../models/UserModel';
import joi from '../middleware/joiValidate';

class UsersServices {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(body: User): Promise<User> {
    const check = joi.validateUsers(body);
    const result = await this.model.create(check);
    return result;
  }
}

export default UsersServices;
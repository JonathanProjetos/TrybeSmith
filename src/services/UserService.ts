import connection from '../models/connection';
import User from '../interfaces/IUser';
import UserModel from '../models/UserModel';

class UsersServices {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(body: User): Promise<User> {
    const result = await this.model.create(body);
    return result;
  }
}

export default UsersServices;
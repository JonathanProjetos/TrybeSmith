import { Pool, RowDataPacket } from 'mysql2/promise';
import Login from '../interfaces/ILogin';

class LoginModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getByBody(username:string, password: string): Promise<Login[]> {
    const query = `
    SELECT 
      username, 
      password 
    FROM Trybesmith.Users 
    WHERE username=? AND password=?;`;
    const [result] = await this.connection.execute<RowDataPacket[]>(query, [username, password]);
    return result as Login[];
  }
}

export default LoginModel;
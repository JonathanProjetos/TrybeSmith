import { Pool } from 'mysql2/promise';
import Order from '../interfaces/IOrders';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const query = `INSERT INTO Trybesmith.Users 
      (username, classe, level, password) VALUES (?, ?, ?, ?)`;

    const [result] = await this.connection.execute(query);

    return result as Order[];
  }
}

export default OrderModel;
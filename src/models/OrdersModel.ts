import { Pool } from 'mysql2/promise';
import Order from '../interfaces/IOrders';

class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const query = `
    SELECT 
        o.id, o.userId, json_arrayagg(p.id) AS productsIds
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS p
      ON p.orderId = o.id
      WHERE p.id 
      GROUP BY o.id
      ORDER BY o.userId;
    `;

    const [result] = await this.connection.execute(query);

    return result as Order[];
  }
}

export default OrderModel;
import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order from '../interfaces/IOrders';
import User from '../interfaces/IUser';
import OrderArray from '../interfaces/IOrderArray';

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
      LEFT JOIN Trybesmith.Products AS p
      ON p.orderId = o.id
      WHERE p.id 
      GROUP BY o.id
      ORDER BY o.userId;
    `;

    const [result] = await this.connection.execute(query);

    return result as Order[];
  }

  public async getByName(name:string): Promise<User[]> {
    const query = 'SELECT * FROM Trybesmith.Users WHERE username=?';
    const [result] = await this.connection.execute(query, [name]);
    console.log('model', result);
    
    return result as User[];
  }

  public async createOrder(productsIds:number[], id:number | undefined): Promise<OrderArray> {
    const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';

    const [result] = await this.connection.execute<ResultSetHeader>(query, [id]);
    console.log(result);
    
    const { insertId } = result;
    
    productsIds.forEach(async (iten) => {
      const querySQL = 'UPDATE Trybesmith.Products SET orderId=? WHERE id=?;';
      await this.connection.execute(querySQL, [insertId, iten]);
    });

    return { userId: id, productsIds } as OrderArray;
  }
}

export default OrderModel;
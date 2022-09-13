import connection from '../models/connection';
import Order from '../interfaces/IOrders';
import OrderModel from '../models/OrdersModel';

class OrderServices {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.model.getAll();
    return result as Order[];
  }
}

export default OrderServices;
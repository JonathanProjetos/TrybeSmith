import connection from '../models/connection';
import Order from '../interfaces/IOrders';
import OrderModel from '../models/OrdersModel';
import OrderArray from '../interfaces/IOrderArray';
import joi from '../middleware/joiValidate';

class OrderServices {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.model.getAll();
    return result as Order[];
  }

  public async create(name: string, body: OrderArray): Promise<Order> {
    const check = joi.validateOrderProductsIds(body);
    
    const { productsIds } = check;
    const getUserId = await this.model.getByName(name);
    console.log('pessoa', getUserId[0]);
    
    const createOrder = await this.model.createOrder(productsIds, getUserId[0].id);

    return createOrder as Order;
  }
}

export default OrderServices;
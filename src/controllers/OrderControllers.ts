import { Request, Response } from 'express';
import OrderServices from '../services/OrderServices';

class OrderControllers {
  constructor(private service = new OrderServices()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };
}

export default OrderControllers;
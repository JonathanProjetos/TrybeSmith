import { Request, Response } from 'express';
import OrderServices from '../services/OrderServices';
import IGetUserAuthInfoRequest from '../interfaces/IGetUserAuthInfoRequest';

class OrderControllers {
  constructor(private service = new OrderServices()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };

  public create = async (req:Request, res: Response) => {
    const { body } = req;
    const { username } = (req as IGetUserAuthInfoRequest).user;
     
    const result = await this.service.create(username, body);
  
    return res.status(201).json(result);
  };
}

export default OrderControllers;
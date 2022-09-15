import { Request, Response } from 'express';
import OrderServices from '../services/OrderServices';
import tokenVerify from '../middleware/tokenLogin';

class OrderControllers {
  constructor(private service = new OrderServices()) { }

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };

  public create = async (req:Request, res: Response) => {
    const { authorization } = req.headers;
    const { body } = req;
    
    const valid = tokenVerify.validateTokenLogin(authorization as any);
  
    const object = Object.values(valid);
    console.log('controller', object);
    
    const result = await this.service.create(object[0], body);
  
    return res.status(201).json(result);
  };
}

export default OrderControllers;
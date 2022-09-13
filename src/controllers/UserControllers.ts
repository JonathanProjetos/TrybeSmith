import { Request, Response } from 'express';
import UsersServices from '../services/UserService';

class ProductsControllers {
  constructor(private service = new UsersServices()) { }

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    const user = await this.service.create({ username, classe, level, password });
    return res.status(201).json(user);
  };
}

export default ProductsControllers;
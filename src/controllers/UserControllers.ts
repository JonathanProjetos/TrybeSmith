import { Request, Response } from 'express';
import UsersServices from '../services/UserService';
import jwtToken from '../middleware/token';

class ProductsControllers {
  constructor(private service = new UsersServices()) { }

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;
    await this.service.create({ username, classe, level, password });
    const token = jwtToken.generateToken(username, classe, level, password);
    return res.status(201).json({ token });
  };
}

export default ProductsControllers;
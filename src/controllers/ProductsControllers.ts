import { Request, Response } from 'express';
import ProductsServices from '../services/ProductsServices';

class ProductsControllers {
  constructor(private service = new ProductsServices()) { }

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    const Product = await this.service.create({ name, amount });
    return res.status(201).json(Product);
  };

  public getAll = async (_req: Request, res: Response) => {
    const result = await this.service.getAll();
    return res.status(200).json(result);
  };
}

export default ProductsControllers;
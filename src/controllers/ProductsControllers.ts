import { Request, Response } from 'express';
import ProductsServices from '../services/ProductsServices';

class ProductsControllers {
  constructor(private service = new ProductsServices()) { }

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;
    const Product = await this.service.create({ name, amount });
    res.status(201).json(Product);
  };
}

export default ProductsControllers;
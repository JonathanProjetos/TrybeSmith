import connection from '../models/connection';
import Produto from '../interfaces/IProducts';
import ProdutosModel from '../models/ProductModel';

class ProductsServices {
  public model: ProdutosModel;

  constructor() {
    this.model = new ProdutosModel(connection);
  }

  public async create(body: Produto): Promise<Produto> {
    const result = await this.model.create(body);
    return result;
  }
}

export default ProductsServices;
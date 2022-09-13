import { Pool, ResultSetHeader } from 'mysql2/promise';
import Produtos from '../interfaces/IProducts';

class ProdutosModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(produto: Produtos): Promise<Produtos> {
    const { name, amount } = produto;
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
    const result = await this.connection.execute<ResultSetHeader>(query, [name, amount]);
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...produto };
  }
}

export default ProdutosModel;
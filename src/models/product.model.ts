import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAllProducts = async (): Promise<Product[]> => {
    const query = 'SELECT * FROM Trybesmith.Products';
    const [rows] = await this.connection.execute(query);
    return rows as Product[];
  };

  public createProduct = async (product: Product): Promise<Product> => {
    const { name, amount } = product;
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)';
    const data = await this.connection.execute<ResultSetHeader>(query, [name, amount]);
    const [dataInserted] = data;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  };
}
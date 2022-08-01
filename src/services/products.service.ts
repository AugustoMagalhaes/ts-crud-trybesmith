import Product from '../interfaces/product.interface';
import connection from '../models/connection';
import ProductModel from '../models/product.model';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public createProduct = async (product: Product): Promise<Product> => {
    const createdProduct = await this.model.createProduct(product);
    return createdProduct;
  };
}
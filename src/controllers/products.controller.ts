import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/products.service';

export default class ProductController {
  private productService;

  constructor() {
    this.productService = new ProductService();
  }

  public getAllProducts = async (req: Request, res: Response) => {
    try {
      const products = await this.productService.getAllProducts();

      if (!products) throw new Error('Something went Wrong');

      return res.status(StatusCodes.OK).json(products);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
      }
    }
  };

  public createProduct = async (req: Request, res: Response) => {
    const product = req.body;

    try {
      const createdProduct = await this.productService.createProduct(product);

      if (!createdProduct) throw new Error('Failed to Create Product');

      return res.status(StatusCodes.CREATED).json(createdProduct);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
      }
    }
  };
}
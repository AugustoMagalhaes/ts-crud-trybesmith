import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductService from '../services/products.service';

export default class ProductController {
  private pService;

  constructor() {
    this.pService = new ProductService();
  }

  public createProduct = async (req: Request, res: Response) => {
    const product = req.body;

    try {
      const createdProduct = await this.pService.createProduct(product);

      if (!createdProduct) throw new Error('wat');

      return res.status(StatusCodes.CREATED).json(createdProduct);
    } catch (err: any | unknown) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  };
}
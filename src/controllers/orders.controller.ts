import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/orders.service';

export default class OrderController {
  private orderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public getAllOrders = async (req: Request, res: Response) => {
    try {
      const products = await this.orderService.getAllOrders();

      if (!products) throw new Error('Something went Wrong');

      return res.status(StatusCodes.OK).json(products);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message });
      }
    }
  };
}
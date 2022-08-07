import IOrder from '../interfaces/order.interface';
import connection from '../models/connection';
import OrderModel from '../models/order.model';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public getAllOrders = async (): Promise<IOrder[]> => {
    const orders = await this.model.getAllOrders();

    const handledOrders: IOrder[] = orders
      .reduce((acc: any[], curr: IOrder): IOrder[] => {
        const { id, userId, productsIds } = curr;

        const checkId = acc.some((el: IOrder) => el.id === id);

        if (!checkId) {
          const remount = { id, userId, productsIds: [productsIds] };
          acc.push(remount);
        } else {
          const oldId = acc.findIndex((el: IOrder) => el.id === id);
          acc[oldId].productsIds.push(productsIds);
        }

        return acc;
      }, []);

    return handledOrders;
  };
}
/* SELECT o.id as ord, u.id as uId, p.id as pId FROM Trybesmith.Orders as o
INNER JOIN Trybesmith.Products as p
ON o.id = p.orderId
INNER JOIN Trybesmith.Users as u
ON u.id = o.userId; */

import { Pool } from 'mysql2/promise';
import IOrder from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAllOrders = async (): Promise<IOrder[]> => {
    const query = 'SELECT o.id, u.id as userId, p.id as productsIds FROM Trybesmith.Orders as o '
    + 'INNER JOIN Trybesmith.Products as p '
    + 'ON o.id = p.orderId '
    + 'INNER JOIN Trybesmith.Users as u '
    + 'ON u.id = o.userId; ';

    const [rows] = await this.connection.execute(query);
    return rows as IOrder[];
  };
}
import { Pool, ResultSetHeader } from 'mysql2/promise';
import IUser from '../interfaces/user.interface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public createUser = async (user: IUser): Promise<IUser> => {
    const { username, classe, level, password } = user;
    const query = 'INSERT INTO Trybesmith.Users (username, classe, level, password)'
    + 'VALUES (?, ?, ?, ?)';
    const data = await this.connection
      .execute<ResultSetHeader>(query, [username, classe, level, password]);
    const [dataInserted] = data;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  };
}
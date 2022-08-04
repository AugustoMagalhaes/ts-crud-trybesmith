import IUser from '../interfaces/user.interface';
import connection from '../models/connection';
import UserModel from '../models/user.model';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public createUser = async (user: IUser): Promise<IUser> => {
    const createdUser = await this.model.createUser(user);
    return createdUser;
  };
}
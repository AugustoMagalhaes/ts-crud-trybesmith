import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import TokenHandler from '../middlewares/TokenHandler';
import UserService from '../services/users.service';

export default class UserController {
  private userService;

  constructor() {
    this.userService = new UserService();
  }

  public createUser = async (req: Request, res: Response) => {
    const user = req.body;
    const tokenHandler = new TokenHandler(user);

    try {
      const createdUser = await this.userService.createUser(user);

      if (!createdUser) throw new Error('Failed to Create User');

      const token = tokenHandler.generateToken();

      return res.status(StatusCodes.CREATED).json({ token });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
      }
    }
  };
}
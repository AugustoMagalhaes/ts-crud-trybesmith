import Jwt, { SignOptions } from 'jsonwebtoken';
import IUser from '../interfaces/user.interface';

export default class TokenHandler {
  user: IUser;

  constructor(user: IUser) {
    this.user = user;
  }

  public generateToken = () => {
    const secret = '$*bemdiferentepraserunico*$';
    const jwtConfig: SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = Jwt.sign({ data: this.user }, secret, jwtConfig);
    return token;
  };
}
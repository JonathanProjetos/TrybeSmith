import { Request, Response } from 'express';
import LoginServices from '../services/LoginService';

class LoginControllers {
  constructor(private service = new LoginServices()) { }

  public verify = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await this.service.Login({ username, password });
    return res.status(200).json({ token });
  };
}

export default LoginControllers;
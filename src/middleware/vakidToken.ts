/* import { Request, Response, NextFunction } from 'express';
import jwtToken from './token';

export = {
  Token: (req: Request, _res:Response, next:NextFunction) => {
    const { authorization } = req.headers;
    const auth : string | undefined = authorization;
    const dados = jwtToken.validateToken(auth);
    next(dados);
  },
}; */
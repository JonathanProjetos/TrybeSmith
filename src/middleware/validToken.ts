/* import { Request, Response, NextFunction } from 'express';
import jwtToken from './token';

export = {
  Token: (req: Request, _res:Response, _next:NextFunction): any => {
    const { authorization } = req.headers;
    const auth : string | undefined = authorization;
    const dados = jwtToken.validateToken(auth as any);
    console.log(dados);
  },
}; */
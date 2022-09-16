import { Request, Response, NextFunction } from 'express';
import IGetUserAuthInfoRequest from '../interfaces/IGetUserAuthInfoRequest';
import ItokenInterface from '../interfaces/IToken';
import jwtToken from './token';

export = {
  Token: (req: Request, _res:Response, next:NextFunction) => {
    const { authorization } = req.headers;
    const dados:ItokenInterface = jwtToken.validateToken(authorization as unknown as string);
    (req as IGetUserAuthInfoRequest).user = dados;
    
    next();
  },
};
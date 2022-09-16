import { Request } from 'express';
// import { JwtPayload } from 'jsonwebtoken';
import ITokenInterface from './IToken';

interface IGetUserAuthInfoRequest extends Request{
  user: ITokenInterface
}

export default IGetUserAuthInfoRequest;
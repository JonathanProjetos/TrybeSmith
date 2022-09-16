import jwt from 'jsonwebtoken';
import tokenInterface from '../interfaces/IToken';

const JWT_SECRET = 'TrybeSmith';

const jwtCheckLogin = {

  generateTokenLogin: (username:string, _password: string) => {
    const token = jwt.sign({ username }, JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  },

  validateTokenLogin: (token: string): tokenInterface => {
    if (!token) throw new Error('401|Token not found');
    try { 
      const test = jwt.verify(token, JWT_SECRET);
      return test as tokenInterface;
    } catch (error) {
      console.log(error);
      throw new Error('401|Invalid token');
    }
  },
};

export default jwtCheckLogin;
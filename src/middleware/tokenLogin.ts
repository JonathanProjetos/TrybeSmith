import jwt from 'jsonwebtoken';

const JWT_SECRET = 'TrybeSmith';

const jwtCheckLogin = {

  generateTokenLogin: (username:string, password: string) => {
    const token = jwt.sign({ username, password }, JWT_SECRET, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  },

  validateTokenLogin: (token: string) => {
    if (!token) throw new Error('401|Token not found');
    try { 
      const test = jwt.verify(token, JWT_SECRET);
      return test;
    } catch (error) {
      console.log(error);
      throw new Error('401|Expired or invalid token');
    }
  },
};

export default jwtCheckLogin;
import express from 'express';
import 'express-async-errors';
import routerProducts from './router/ProductsRouter';
import routerUser from './router/UserRouter';
import routerOrder from './router/OrderRouter';
import routerLogin from './router/LoginRoute';
// import ValidToken from './middleware/vakidToken';

const app = express();

app.use(express.json());

app.use('/', routerProducts);
app.use('/', routerUser);
app.use('/', routerOrder);
app.use('/', routerLogin);

app.use((
  err: Error, 
  req: express.Request, 
  res: express.Response, 
  _next: express.NextFunction,
) => {
  const [code, message] = err.message.split('|');
  
  if (req.statusMessage === undefined) {
    return res.status(500).json({ message: 'Error não identificado' });
  }
  return res.status(Number(code)).json({ message });
});

export default app;

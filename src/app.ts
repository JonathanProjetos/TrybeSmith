import express from 'express';
import 'express-async-errors';
import router from './router/ProductsRouter';

const app = express();

app.use(express.json());

app.use('/', router);

app.use((
  err: Error, 
  req: express.Request, 
  res: express.Response, 
  _next: express.NextFunction,
) => {
  const [code, message] = err.message.split('|');
  if (!err.message) {
    return res.status(500).json({ message: 'Error não identificado' });
  }
  return res.status(Number(code)).json({ message });
});

export default app;

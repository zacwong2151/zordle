import express, { Request, Response , Application } from 'express';

const app: Application = express();
const port = 7000;

app.get('/', (req: Request, res: Response) => {
  res.send('userService is working');
});

app.listen(port, () => {
  console.log(`userService is running at https://localhost:${port}`);
});
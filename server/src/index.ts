import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {
  catRoute,
  refBookRoute,
  audioBookRoute,
  dvdRoute,
  bookRoute,
  employeeRoute,
  managerRoute,
} from './routes/';

dotenv.config();

const app: Express = express();

// cors
app.use(cors());
app.use(express.json());

// Server port
const port = process.env.PORT;

const startServer = () => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
  });
};

startServer();

// Libraryitems
app.use('/api/', catRoute);
app.use('/api/', refBookRoute);
app.use('/api/', audioBookRoute);
app.use('/api/', dvdRoute);
app.use('/api/', bookRoute);

// Employees
app.use('/api/', employeeRoute);
app.use('/api/', managerRoute);

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// import routes from './routes';
import { pool } from './config/db';
import { catRoute, refBookRoute, audioBookRoute, dvdRoute } from './routes/';

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

app.use('/api', catRoute);
app.use('/api/', refBookRoute);
app.use('/api/', audioBookRoute);
app.use('/api/', dvdRoute);

import express, { Router } from 'express';
import {
  create,
  get,
  edit,
  deleteManager,
} from '../controllers/manager.controller';

export const managerRoute: Router = express.Router();

managerRoute.get('/managers/', get);
managerRoute.post('/managers/', create);
managerRoute.put('/managers/:id', edit);
managerRoute.delete('/managers/:id', deleteManager);

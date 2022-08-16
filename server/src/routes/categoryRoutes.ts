import express, { Router } from 'express';
import {
  get,
  create,
  edit,
  deleteCategory,
} from '../controllers/category.controllers';

export const catRoute: Router = express.Router();

catRoute.get('/category', get);

catRoute.post('/category', create);

catRoute.put('/category/:id', edit);

catRoute.delete('/category/:id', deleteCategory);

import express, { Router } from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controllers';

export const catRoute: Router = express.Router();

catRoute.get('/', getCategories);

catRoute.post('/', createCategory);

catRoute.put('/:id', updateCategory);

catRoute.delete('/:id', deleteCategory);

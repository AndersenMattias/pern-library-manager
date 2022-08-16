import express, { Router } from 'express';
import {
  create,
  get,
  edit,
  deleteBook,
  search,
} from '../controllers/book.controller';

export const bookRoute: Router = express.Router();

bookRoute.get('/books', get);
bookRoute.get('/books/search/', search);
bookRoute.post('/books', create);
bookRoute.put('/books/:id', edit);
bookRoute.delete('/books/:id', deleteBook);

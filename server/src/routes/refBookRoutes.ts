import express, { Router } from 'express';
import {
  create,
  get,
  edit,
  deleteRefBook,
} from '../controllers/referenceBook.controller';

export const refBookRoute: Router = express.Router();

refBookRoute.get('/refBooks', get);
refBookRoute.post('/refBooks', create);
refBookRoute.put('/refBooks/:id', edit);
refBookRoute.delete('/refBooks/:id', deleteRefBook);

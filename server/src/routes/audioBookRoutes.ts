import express, { Router } from 'express';
import {
  create,
  get,
  edit,
  deleteAudioBook,
} from '../controllers/audioBook.controller';

export const audioBookRoute: Router = express.Router();

audioBookRoute.get('/audioBooks', get);
audioBookRoute.post('/audioBooks', create);
audioBookRoute.put('/audioBooks/:id', edit);
audioBookRoute.delete('/audioBooks/:id', deleteAudioBook);

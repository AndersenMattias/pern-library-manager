import express, { Router } from 'express';
import { create, deleteDvd, edit, get } from '../controllers/dvd.controllers';

export const dvdRoute: Router = express.Router();

dvdRoute.get('/dvd', get);
dvdRoute.post('/dvd', create);
dvdRoute.put('/dvd/:id', edit);
dvdRoute.delete('/dvd/:id', deleteDvd);

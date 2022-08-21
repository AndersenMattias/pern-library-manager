import express, { Router } from 'express';
import {
  create,
  get,
  edit,
  deleteEmployee,
  getOne,
} from '../controllers/employee.controller';

export const employeeRoute: Router = express.Router();

employeeRoute.get('/employees/', get);
employeeRoute.get('/employees/:username', getOne);
employeeRoute.post('/employees/', create);
employeeRoute.put('/employees/:id', edit);
employeeRoute.delete('/employees/:id', deleteEmployee);

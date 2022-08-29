import express, { Router } from 'express';
import {
  create,
  get,
  edit,
  deleteEmployee,
  getOne,
  getOneWithManager,
} from '../controllers/employee.controller';

export const employeeRoute: Router = express.Router();

employeeRoute.get('/employees/', get);
// employeeRoute.get('/employees/:id', getOne);
employeeRoute.get('/employees/:username', getOneWithManager);
employeeRoute.post('/employees/', create);
employeeRoute.put('/employees/:id', edit);
employeeRoute.delete('/employees/:id', deleteEmployee);

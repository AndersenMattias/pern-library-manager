import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getEmployees = await pool.query(
      `SELECT * FROM "Employee" ORDER BY "firstName" ASC `
    );
    res.status(200).send({ message: 'Employees found.', data: getEmployees });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const username = req.params.username;
    const getEmployee = await pool.query(
      `SELECT * FROM "Employee" WHERE username = $1`,
      [username]
    );
    res
      .status(200)
      .send({ message: 'Employee found.', data: getEmployee.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      managerId,
      firstName,
      lastName,
      email,
      username,
      password,
      salary,
    } = req.body;

    const newEmployee = await pool.query(
      `INSERT INTO "Employee" ("managerId",
      "firstName",
      "lastName",
      email,
      username,
      password,
      salary
     ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [managerId, firstName, lastName, email, username, password, salary]
    );
    res
      .status(201)
      .send({ message: 'Employee added.', data: newEmployee.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const {
      managerId,
      firstName,
      lastName,
      email,
      username,
      password,
      salary,
    } = req.body;

    const newEmployee = await pool.query(
      `UPDATE "Employee" SET "managerId" = $1,
      "firstName" = $2,
      "lastName" = $3,
      email = $4,
      username = $5,
      password = $6,
      salary = $7
      WHERE id = $8
      RETURNING *
     `,
      [managerId, firstName, lastName, email, username, password, salary, id]
    );
    res
      .status(200)
      .send({ message: 'Employee updated.', data: newEmployee.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    const deleteEmployee = await pool.query(
      `DELETE FROM "Employee" WHERE id = $1
     `,
      [id]
    );
    res.status(200).send({ message: 'Employee deleted.' });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getManagers = await pool.query(
      `SELECT * FROM "Manager" ORDER BY "firstName" ASC `
    );
    res
      .status(200)
      .send({ message: 'Employees found.', data: getManagers.rows });
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
      ceoId,
      firstName,
      lastName,
      email,
      username,
      password,
      areaResponsibility,
      salary,
    } = req.body;

    const newManager = await pool.query(
      `INSERT INTO "Manager" ("ceoId",
      "firstName",
      "lastName",
      email,
      username,
      password,
      "areaResponsibility",
      salary
     ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        ceoId,
        firstName,
        lastName,
        email,
        username,
        password,
        areaResponsibility,
        salary,
      ]
    );
    res.status(201).send({ message: 'Manager added.', data: newManager.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const { firstName, lastName, email, username, password } = req.body;

    const updatedManager = await pool.query(
      `UPDATE "Manager" SET "firstName" = $1,
      "lastName" = $2,
      email = $3,
      username = $4,
      password = $5
      WHERE id = $6
      RETURNING "firstName", "lastName", email, username, password
     `,
      [firstName, lastName, email, username, password, id]
    );
    res
      .status(200)
      .send({ message: 'Manager updated.', data: updatedManager.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const deleteManager = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);

    const deleteManager = await pool.query(
      `DELETE FROM "Manager" WHERE id = $1
     `,
      [id]
    );
    res.status(200).send({ message: 'Manager deleted.' });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

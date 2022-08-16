import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dvds = await pool.query(`SELECT * FROM "DVD" ORDER BY title ASC`);
    res.status(200).send({ message: 'Dvds found.', data: dvds.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong.');
    }
  }
};
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, title, runTimeMinutes, isBorrowable } = req.body;
    const title_vector = String(req.body.title);
    const newDvd = await pool.query(
      `INSERT INTO "DVD" ("categoryId",
    title,
    "runTimeMinutes",
    "isBorrowable",
    "searchVector"
    ) VALUES ($1, $2, $3, $4, to_tsvector($5)) RETURNING * `,
      [categoryId, title, runTimeMinutes, isBorrowable, title_vector]
    );

    res.status(200).send({ message: 'Dvd added.', data: newDvd.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong.');
    }
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const {
      categoryId,
      title,
      runTimeMinutes,
      isBorrowable,
      borrower,
      borrowDate,
    } = req.body;
    const updatedDvd = await pool.query(
      `UPDATE "DVD" SET "categoryId" = $1, title = $2, "runTimeMinutes" = $3, "isBorrowable" = $4, borrower = $5, "borrowDate" = $6 WHERE id = $7 RETURNING *`,
      [
        categoryId,
        title,
        runTimeMinutes,
        isBorrowable,
        borrower,
        borrowDate,
        id,
      ]
    );
    res.status(200).send({ message: 'Dvd updated.', data: updatedDvd.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong.');
    }
  }
};

export const deleteDvd = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const deletedDvd = await pool.query(`DELETE FROM "DVD" WHERE id = $1`, [
      id,
    ]);
    res.status(200).send({ message: 'Dvd removed.' });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong.');
    }
  }
};

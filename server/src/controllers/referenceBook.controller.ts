import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fetchRefBooks = await pool.query(
      `SELECT * FROM "ReferenceBook" ORDER BY title ASC;`
    );
    res.status(200).send({ data: fetchRefBooks.rows });
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
    const { categoryId, title, author, pages, isBorrowable } = req.body;
    const newRefBook = await pool.query(
      ` INSERT INTO "ReferenceBook" (
        "categoryId",
        title,
        author,
        pages,
        "isBorrowable"
       ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [categoryId, title, author, pages, isBorrowable]
    );
    res.status(200).send({ data: newRefBook.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const { title, author, pages, isBorrowable, borrower, borrowDate } =
      req.body;
    const updatedRefBook = await pool.query(
      `UPDATE "ReferenceBook" SET title = $1, author = $2, pages = $3, "isBorrowable" = $4, borrower = $5, "borrowDate" = $6 WHERE id = $7 RETURNING *`,
      [title, author, pages, isBorrowable, borrower, borrowDate, id]
    );
    res
      .status(200)
      .send({ message: 'RefBook updated.', data: updatedRefBook.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const deleteRefBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const deletedBook = await pool.query(
      `DELETE FROM "ReferenceBook" WHERE id = $1 RETURNING *`,
      [id]
    );
    res
      .status(200)
      .send({ message: 'RefBook deleted.', data: deletedBook.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

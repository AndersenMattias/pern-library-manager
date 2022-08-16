import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // TODO: Improve Search terms
    const title = String(req.query.title);
    const foundData = await pool.query(
      `SELECT title, "isBorrowable" FROM "Book"
      WHERE "searchVector" @@ to_tsquery($1)
UNION
SELECT title, "isBorrowable" FROM "ReferenceBook" 
        WHERE "searchVector" @@ to_tsquery($1)
  UNION
  SELECT title, "isBorrowable" FROM "DVD" 
        WHERE "searchVector" @@ to_tsquery($1)
  UNION
  SELECT title, "isBorrowable" FROM "AudioBook" 
        WHERE "searchVector" @@ to_tsquery($1)
        `,

      [title]
    );
    res.status(200).send({ data: foundData.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const books = await pool.query(`SELECT * FROM "Book" ORDER BY title ASC;`);
    res.status(200).send({ data: books.rows });
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
    const title_vector = String(req.body.title);
    const newBook = await pool.query(
      ` INSERT INTO "Book" (
        "categoryId",
        title,
        author,
        pages,
        "isBorrowable",
        "searchVector",
       ) VALUES ($1, $2, $3, $4, $5, to_tsvector($6)) RETURNING *`,
      [categoryId, title, author, pages, isBorrowable, title_vector]
    );
    res.status(200).send({ data: newBook.rows });
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
    const updatedBook = await pool.query(
      `UPDATE "Book" SET title = $1, author = $2, pages = $3, "isBorrowable" = $4, borrower = $5, "borrowDate" = $6 WHERE id = $7 RETURNING *`,
      [title, author, pages, isBorrowable, borrower, borrowDate, id]
    );
    res
      .status(200)
      .send({ message: 'RefBook updated.', data: updatedBook.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const deletedBook = await pool.query(
      `DELETE FROM "Book" WHERE id = $1 RETURNING *`,
      [id]
    );
    res.status(200).send({ message: 'Book deleted.', data: deletedBook.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

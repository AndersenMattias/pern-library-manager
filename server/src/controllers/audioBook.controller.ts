import { Request, Response, NextFunction } from 'express';
import { pool } from '../config/db';

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const audioBooks = await pool.query(`SELECT * FROM "AudioBook"`);
    res
      .status(200)
      .send({ message: 'AudioBooks found.', data: audioBooks.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong');
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
    const newAudioBook = await pool.query(
      `INSERT INTO "AudioBook" ("categoryId",
    title,
    "runTimeMinutes",
    "isBorrowable")
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [categoryId, title, runTimeMinutes, isBorrowable]
    );
    res
      .status(200)
      .send({ message: 'AudioBook created.', data: newAudioBook.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong');
    }
  }
};

export const edit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    const { categoryId, title, runTimeMinutes, isBorrowable } = req.body;
    const newAudioBook = await pool.query(
      `UPDATE "AudioBook" SET "categoryId" = $1,
    title = $2,
    "runTimeMinutes" = $3,
    "isBorrowable" = $4
    WHERE id = $5
    RETURNING *
    `,
      [categoryId, title, runTimeMinutes, isBorrowable, id]
    );
    res
      .status(200)
      .send({ message: 'AudioBook updated.', data: newAudioBook.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong');
    }
  }
};
export const deleteAudioBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const newAudioBook = await pool.query(
      `DELETE FROM "AudioBook" WHERE ID = $1
    RETURNING *
    `,
      [id]
    );
    res
      .status(200)
      .send({ message: 'AudioBook deleted.', data: newAudioBook.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong');
    }
  }
};

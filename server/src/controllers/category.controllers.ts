import express, { Request, Response, NextFunction, Router } from 'express';
import { pool } from '../config/db';

const router: Router = express.Router();

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryName } = req.body;
    const newCategory = await pool.query(
      `INSERT INTO "Category" ("categoryName") VALUES ($1) RETURNING *`,
      [categoryName]
    );
    res.status(201).send({
      message: `Category added: ${newCategory}`,
      data: newCategory.rows,
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      throw new Error('Something went wrong..');
    }
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const fetchCategories = await pool.query(`SELECT * FROM "Category"`);
    res.status(200).send(fetchCategories.rows);
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      throw new Error('Something went wrong..');
    }
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const { categoryName } = req.body;
    const updatedCategory = await pool.query(
      `UPDATE "Category" SET "categoryName" = $1 WHERE id = $2 RETURNING *`,
      [categoryName, id]
    );
    res
      .status(200)
      .send({ message: 'Category updated', data: updatedCategory.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const deleteOneCat = await pool.query(
      `DELETE FROM "Category" WHERE ID = $1 RETURNING *`,
      [id]
    );
    res
      .status(200)
      .send({ message: 'Category deleted', data: deleteOneCat.rows });
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('Something went wrong..');
    }
  }
};

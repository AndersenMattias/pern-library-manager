CREATE DATABASE pern_library;


CREATE TABLE "Book" (
  id SERIAL PRIMARY KEY,
  "categoryId" INT REFERENCES "Category"(id),
  title VARCHAR ,
  author VARCHAR ,
  pages INT ,
  "isBorrowable" BIT,
  borrower VARCHAR,
  "borrowDate" DATE
);

CREATE TABLE "DVD" (
  id SERIAL PRIMARY KEY,
  "categoryId" INT REFERENCES "Category"(id),
  title VARCHAR ,
  "runTimeMinutes" INT,
  "isBorrowable" BIT,
  borrower VARCHAR,
  "borrowDate" DATE
);

CREATE TABLE "AudioBook" (
  id SERIAL PRIMARY KEY,
  "categoryId" INT REFERENCES "Category"(id),
  title VARCHAR ,
  "runTimeMinutes" INT,
  "isBorrowable" BIT,
  borrower VARCHAR,
  "borrowDate" DATE
);

CREATE TABLE "ReferenceBook" (
  id SERIAL PRIMARY KEY,
  "categoryId" INT REFERENCES "Category"(id),
  title VARCHAR ,
  author VARCHAR ,
  pages INT ,
  "isBorrowable" BIT NULL,
  borrower VARCHAR,
  "borrowDate" DATE
);

CREATE TABLE "Category" (
  id SERIAL PRIMARY KEY,
  "categoryName" VARCHAR  UNIQUE
);

CREATE TABLE "Employees" (
  id SERIAL PRIMARY KEY,
  "firstName" VARCHAR ,
  "lastName" VARCHAR ,
  salary DECIMAL,
  "isCEO" BIT,
  "isManager" BIT,
  "managerId" INT
);

INSERT INTO "ReferenceBook" ("categoryId", title, author, pages, "isBorrowable", borrower, "borrowDate") 
VALUES (8, 'Gone Girl', 'Test', 121, '1', 'Mattias', '2022-08-9') RETURNING *;

DROP TABLE "LibraryItem";
DROP TABLE "Category";
DROP TABLE "Employees";
CREATE DATABASE pern_library;


CREATE TABLE "Book" (
  id SERIAL PRIMARY KEY,
  "categoryId" INT REFERENCES "Category"(id),
  title VARCHAR ,
  author VARCHAR ,
  pages INT ,
  "searchVector" TSVECTOR,
  "isBorrowable" BIT,
  borrower VARCHAR,
  "borrowDate" DATE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updateAt" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "DVD" (
  id SERIAL PRIMARY KEY,
  "categoryId" INT REFERENCES "Category"(id),
  title VARCHAR ,
  "runTimeMinutes" INT,
   "searchVector" TSVECTOR,
  "isBorrowable" BIT,
  borrower VARCHAR,
  "borrowDate" DATE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updateAt" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "AudioBook" (
  id SERIAL PRIMARY KEY,
  "categoryId" INT REFERENCES "Category"(id),
  title VARCHAR ,
  "runTimeMinutes" INT,
   "searchVector" TSVECTOR,
  "isBorrowable" BIT,
  borrower VARCHAR,
  "borrowDate" DATE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updateAt" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "ReferenceBook" (
  id SERIAL PRIMARY KEY,
  "categoryId" INT REFERENCES "Category"(id),
  title VARCHAR ,
  author VARCHAR ,
  pages INT ,
  "searchVector" TSVECTOR,
  "isBorrowable" BIT NULL,
  borrower VARCHAR,
  "borrowDate" DATE,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updateAt" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "Category" (
  id SERIAL PRIMARY KEY,
  "categoryName" VARCHAR  UNIQUE
);

CREATE TABLE "Employee" (
  id SERIAL PRIMARY KEY,
  "managerId" INT REFERENCES "Manager"(id),
  "isCEO" BIT DEFAULT '0'::bit NOT NULL,
  "isManager" BIT DEFAULT '0'::bit NOT NULL,
  "firstName" VARCHAR,
  "lastName" VARCHAR,
  email VARCHAR,
  username VARCHAR,
  password VARCHAR,
  salary DECIMAL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updateAt" TIMESTAMP WITH TIME ZONE
);

CREATE TABLE "Manager" (
  id SERIAL PRIMARY KEY,
  "ceoId" INT REFERENCES "CEO"(id),
  "isCEO" BIT DEFAULT '0'::bit NOT NULL,
  "isManager" BIT DEFAULT '1'::bit NOT NULL,
  "firstName" VARCHAR,
  "lastName" VARCHAR,
  email VARCHAR,
  username VARCHAR,
  password VARCHAR,
  "areaResponsibility" VARCHAR,
  salary DECIMAL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updateAt" TIMESTAMP WITH TIME ZONE  
);

CREATE TABLE "CEO" (
  id int GENERATED ALWAYS AS (1) STORED UNIQUE,
  "isCEO" BIT DEFAULT '1'::bit NOT NULL,
  "isManager" BIT DEFAULT '1'::bit NOT NULL,
  email VARCHAR,
  username VARCHAR,
  password VARCHAR,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT now(),
  "updateAt" TIMESTAMP WITH TIME ZONE  
);

INSERT INTO "ReferenceBook" ("categoryId", title, author, pages, "isBorrowable", borrower, "borrowDate") 
VALUES (8, 'Gone Girl', 'Test', 121, '1', 'Mattias', '2022-08-9') RETURNING *;

INSERT INTO "Book" (
        "categoryId",
        title,
        author,
        pages,
        "isBorrowable",
        "searchVector"       
       ) VALUES (8, 'Min bror heter Nisse.', 'Mattias', 431, null, to_tsvector('Min bror heter Nisse.')) RETURNING *

INSERT INTO "ReferenceBook" (
        "categoryId",
        title,
        author,
        pages,
        "isBorrowable",
        "searchVector"       
       ) VALUES (8, 'Berättelsen om Nisse som bodde i skogen.', 'Mattias', 431, null, to_tsvector('Berättelsen om Nisse som bodde i skogen.')) RETURNING *


INSERT INTO "Manager" ("ceoId", "areaResponsibility", email, username, password, salary) VALUES (1, 'HR', 'harlenback@gmail.com', 'harlenback', '123', 32.000)

SELECT * FROM "Employee" ORDER BY "firstName" ASC 
SELECT * FROM "Employee" JOIN "Manager" ON "Employee"."managerId" = "Manager".id;
SELECT * FROM "Employee" JOIN "Manager" ON "Employee"."managerId" = "Manager".id 
WHERE "Employee".id = 2



DROP TABLE "LibraryItem";
DROP TABLE "Category";
DROP TABLE "Employees";
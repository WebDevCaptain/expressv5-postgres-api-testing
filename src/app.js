import express from "express";

// Routers
import BooksRouter from "./routes/books.js";

export default function () {
  const app = express();

  // Parse incoming JSON in request body
  app.use(express.json());
  app.use(BooksRouter);

  return app;
}

const express = require("express");

// Routers
const BooksRouter = require("./routes/books");

module.exports = () => {
  const app = express();

  // Parse incoming JSON in request body
  app.use(express.json());
  app.use(BooksRouter);

  return app;
};

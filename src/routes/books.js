const express = require("express");
const BookRepo = require("../repository/books-repo");
const router = express.Router();

router.get("/books", async (req, res) => {
  const books = await BookRepo.find();
  const count = await BookRepo.count();

  res.send({
    books,
    count,
  });
});

router.post("/books", async (req, res) => {
  const { title, author } = req.body;

  const book = await BookRepo.insert(title, author);
  res.send(book);
});

router.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  const book = await BookRepo.findById(id);

  if (book) {
    res.send(book);
  } else {
    res.status(404).json({
      error: `Book with ID = ${id} doesn't exist.`,
    });
  }
});

router.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  const book = await BookRepo.update({ id, title, author, price });

  if (book) {
    res.send(book);
  } else {
    res.status(404).json({
      error: `Book with ID = ${id} cannot be updated.`,
    });
  }
});

router.delete("/books/:id", async (req, res) => {
  const { id } = req.params;

  const book = await BookRepo.delete(id);

  if (book) {
    res.send(book);
  } else {
    res.status(404).json({
      error: `Book with ID = ${id} cannot be deleted.`,
    });
  }
});

module.exports = router;

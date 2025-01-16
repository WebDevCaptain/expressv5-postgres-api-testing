const express = require("express");
const router = express.Router();

router.get("/books", async (req, res) => {
  res.status(200).send({
    title: "Staff Engineer Handbook",
    price: 2900,
  });
});

router.post("/books", async (req, res) => {});

router.get("/books/:id", async (req, res) => {});

router.patch("/books/:id", async (req, res) => {});

router.delete("/books/:id", async (req, res) => {});

module.exports = router;

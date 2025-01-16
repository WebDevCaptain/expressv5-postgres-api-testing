const express = require("express");
const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const client = new pg.Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: "localhost",
  port: 5432,
  database: process.env.POSTGRES_DB,
});

app.get("/books", (req, res) => {
  res.status(200).json({
    name: "Staff Engineer Path",
    price: 1200,
  });
});

const PORT = 3000;

app.listen(PORT, async () => {
  await client.connect();

  const res = await client.query("SELECT NOW()");
  console.log(res);
  console.log(`Server is running on PORT ${PORT}`);
});

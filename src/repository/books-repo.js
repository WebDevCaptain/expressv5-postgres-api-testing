import pool from "../pool.js";
import camelcase from "camelcase";

const toCamelCase = (rows) => {
  return rows.map((row) => {
    const camelCasedObj = {};

    for (let key in row) {
      camelCasedObj[camelcase(key)] = row[key];
    }

    return camelCasedObj;
  });
};

class BookRepo {
  static async find() {
    const { rows } = await pool.query("SELECT * FROM books;");
    return toCamelCase(rows);
  }

  static async findById(id) {
    const { rows } = await pool.query("SELECT * FROM books WHERE id = $1;", [
      id,
    ]);

    return toCamelCase(rows)[0];
  }

  static async insert(title, author) {
    const { rows } = await pool.query(
      "INSERT INTO books(title, author) VALUES ($1, $2) RETURNING *;",
      [title, author]
    );
    return toCamelCase(rows)[0];
  }

  static async update({ id, title, author, price }) {
    const { rows } = await pool.query(
      "UPDATE books SET title = $1, author = $2, price = $3 WHERE id = $4 RETURNING *;",
      [title, author, price, id]
    );

    return toCamelCase(rows)[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *;",
      [id]
    );

    return toCamelCase(rows)[0];
  }

  static async count() {
    const { rows } = await pool.query("SELECT COUNT(*) FROM books;");

    return parseInt(rows[0].count);
  }
}

export default BookRepo;

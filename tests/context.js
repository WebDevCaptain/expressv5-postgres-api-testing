import { randomBytes } from "crypto";
import format from "pg-format";
import migrate from "node-pg-migrate";
import { config } from "dotenv";
import pool from "../src/pool";

config({ path: "test.env" });

const DEFAULT_OPTS = {
  host: process.env.BOOKS_PG_HOST,
  port: process.env.BOOKS_PG_PORT,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
};

class Context {
  constructor(roleName) {
    this.roleName = roleName;
  }

  static async build() {
    const roleName = "booksdb-" + randomBytes(4).toString("hex");

    await pool.connect(DEFAULT_OPTS);

    // Create a new role
    await pool.query(
      format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName)
    );

    // Create a schema with same name as role
    await pool.query(
      format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName)
    );

    // Disconnect from Postgres
    await pool.close();

    // Run the migrations in the new schema (to prepare the DB tables for testing)
    await migrate({
      schema: roleName,
      direction: "up",
      log: () => {},
      noLock: true,
      dir: "migrations",
      databaseUrl: {
        host: process.env.BOOKS_PG_HOST,
        port: process.env.BOOKS_PG_PORT,
        database: process.env.POSTGRES_DB,
        user: roleName,
        password: roleName,
      },
    });

    // Connect to Postgres as the newly created role
    await pool.connect({
      host: process.env.BOOKS_PG_HOST,
      port: process.env.BOOKS_PG_PORT,
      database: process.env.POSTGRES_DB,
      user: roleName,
      password: roleName,
    });

    return new Context(roleName);
  }

  async close() {
    // Disconnect as the current user
    await pool.close();

    // Reconnect as root user
    await pool.connect(DEFAULT_OPTS);

    // Delete the role & schema we created when building this context
    await pool.query(format("DROP SCHEMA %I CASCADE;", this.roleName));
    await pool.query(format("DROP ROLE %I;", this.roleName));

    // Disconnect
    await pool.close();
  }
}

export default Context;

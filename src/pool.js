import pg from "pg";

class Pool {
  _pool = null;

  connect(opts) {
    this._pool = new pg.Pool(opts);
    return this._pool.query("SELECT 1 + 1");
  }

  close() {
    return this._pool.end();
  }

  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

export default new Pool();

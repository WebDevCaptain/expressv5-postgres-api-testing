const pg = require("pg");

class Pool {
  _pool = null;

  connect(opts) {
    this._pool = new pg.Pool(opts);
    return this._pool.query("SELECT 1 + 1");
  }
}

module.exports = new Pool();

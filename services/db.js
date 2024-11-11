const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('quotes.db'), {fileMustExist: true});

function query(sql, params) {
  return db.prepare(sql).all(params);
};

module.exports = {
  query
};
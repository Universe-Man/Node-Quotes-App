const db = require('../services/db');
const config = require('../config');


function getOne(id) {
  const data = db.query(`SELECT * FROM quote WHERE id = ?`, [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    } else if (!row) {
      res.status(404).send('Product Not Found');
    } else {
      res.send(row);
    };
  });
  return data;
};

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM quote LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  };
};

function validateCreate(quote) {
  let messages = [];
  console.log(quote);
  if (!quote) {
    messages.push('No object is provided');
  };
  if (!quote.quote) {
    messages.push('Quote is empty');
  };
  if (!quote.author) {
    messages.push('Author is empty');
  };
  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;
    throw error;
  };
};

function create(quoteObj) {
  validateCreate(quoteObj);
  const {quote, author} = quoteObj;
  const result = db.run('INSERT INTO quote (quote, author) VALUES (@quote, @author)', {quote, author});
  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'Quote created successfully';
  };
  return {message};
};

// function update(id, quoteObj) {
//   validateCreate(quoteObj);
//   const id = id;
//   const {quote, author} = quoteObj;
//   const result = db.run()
// };

function destroy(id) {
  const result = db.run('DELETE FROM quote WHERE id = (id) VALUES (@id)', {id});
  let message = 'Error in deleting quote';
  if (result.changes) {
    message = 'Quote deleted successfully';
  };
  return {message};

}

module.exports = {
  getMultiple,
  getOne,
  validateCreate,
  create,
  // update
  destroy
};
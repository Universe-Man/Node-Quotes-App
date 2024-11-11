const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');

router.get('/', function(req, res, next) {
  try {
    res.json(quotes.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  };
});

router.post('/', function(req, res, next) {
  try {
    res.json(quotes.create(req.body));
  } catch(err) {
    console.error(`Error while adding quotes `, err.message);
    next(err);
  };
});

router.put('/:id', function(req, res, next) {
  try {
    res.json(quotes.update(id, req.body));
  } catch(err) {
    console.error(`Error while updating quote `, err.message);
    next(err);
  };
});

router.delete('/:id', function(req, res, next) {
  try {
    res.json(quotes.destroy(req.params.id));
  } catch(err) {
    console.error(`Error while deleting quote `, err.message);
    next(err);
  };
});

module.exports = router;
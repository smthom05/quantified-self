var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var pry = require('pryjs');

// GET specific food
router.get('/:id', function(req, res) {
  Food.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name', 'calories']
  })
  .then(food => {
    if (food) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(food));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({'error': 'Food Not Found'}))
    }
  });
});

module.exports = router;

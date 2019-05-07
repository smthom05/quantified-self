var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var pry = require('pryjs');
// Get all foods
router.get("/", function (req, res) {
  Food.findAll({
    attributes: ['id', 'name', 'calories']
  })
  .then(foods => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(foods));
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ error })
  });
});

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
  })
});

// POST new Food
router.post('/', async (req, res) => {
  Food.create({
      name: req.body.food.name,
      calories: req.body.food.calories
  })
  .then(food => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify(food));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({'error': 'Food Not Created'}))
  })
});

module.exports = router;

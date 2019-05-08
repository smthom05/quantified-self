var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFood = require('../../../models').MealFood;
var pry = require('pryjs');

// Get all meals
router.get('/', function (req, res) {
  Meal.findAll({
    attributes: ['id', 'name'],
    include: [{model:Food, attributes: ['id', 'name', 'calories'], through: { attributes: []}}]
  })
  .then(meals => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(meals)
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json')
    res.status(404).send({error})
  })
})

router.get('/:id/foods', function (req, res) {
  Meal.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'name'],
    include: [{model:Food, attributes: ['id', 'name', 'calories'], through: { attributes: []}}]
  })
  .then(meal => {
    if (meal) {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).send(meal)
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(404).send(JSON.stringify({"error": "Meal not found!!"}))
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json')
    res.status(404).send({error})
  })
})


module.exports = router;

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
    include: [{model:Food, attributes: ['id', 'name', 'calories'], through: { attributes: []}}],
    exclude: [{model:Food.MealFood}]
  })
  .then(foods => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(foods)
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json')
    res.status(404).send({error})
  })
})


module.exports = router;

// Helper Methods

// function _responseFormatter(foods) {
//   delete foods
// }

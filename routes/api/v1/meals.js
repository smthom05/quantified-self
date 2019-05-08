var express = require("express");
var router = express.Router();
var Food = require('../../../models').Food;
var Meal = require('../../../models').Meal;
var MealFood = require('../../../models').MealFood;
var pry = require('pryjs');

// Meal Index Endpoint
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

// Meal Show Endpoint
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

// Create MealFood Assocation Endpoint
router.post('/:meal_id/foods/:food_id', function (req, res) {
   MealFood.findOrCreate({
    where: {
      MealId: req.params.meal_id,
      FoodId: req.params.food_id
    },
    defaults: {
      MealId: req.params.meal_id,
      FoodId: req.params.food_id
    }
  })
  .then(mealFood => {
    return Meal.findOne({
      where: {
        id: mealFood[0].MealId
      },
        include: [{model:Food, attributes: ['name'], through: { attributes: []}}]
    })
    .then(meal => {
      res.setHeader('Content-Type', 'application/json')
      res.status(201).send(JSON.stringify({"success": `Successfully added ${meal.Food[meal.Food.length-1].name} to ${meal.name}`}))
    })
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json')
    res.status(404).send(JSON.stringify({"error": "MealFood Not Created"}))
  })
})

module.exports = router;

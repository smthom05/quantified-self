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
    addTotalCalories(meals)
    .then(result=> {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).send(result)
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json')
      res.status(404).send({error})
    })
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
    attributes: ['name'],
    include: [{model:Food, attributes: ['name', 'calories'], through: { attributes: []}}]
  })
  .then(meal => {
    if (meal) {
      newMeal = meal.toJSON();
      newMeal['totalCalories'] = meal.getTotalCalories();
      res.setHeader('Content-Type', 'application/json')
      res.status(200).send(newMeal)
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
      return Food.findOne({
        where: {
          id: req.params.food_id
        }
      })
      .then(food => {
        res.setHeader('Content-Type', 'application/json')
        res.status(201).send(JSON.stringify({"success": `Successfully added ${food.name} to ${meal.name}`}))
      })
    })
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json')
    res.status(404).send(JSON.stringify({"error": "MealFood Not Created"}))
  })
})
// Delete  MealFood Assocation Endpoint
router.delete('/:meal_id/foods/:food_id', function (req, res) {
  MealFood.destroy({
    where: {
      MealId: req.params.meal_id,
      FoodId: req.params.food_id
    }
  })
  .then(mealFood => {
    if (mealFood) {
      res.setHeader('Content-Type', 'application/json')
      res.status(204).send(JSON.stringify({"success": `Successfully Deleted MealFood!!`}))
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(404).send(JSON.stringify({"error": `MealFood not found!!`}))
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json')
    res.status(404).send(JSON.stringify({"error": "MealFood Not Created"}))
  })
})


function addTotalCalories(meals) {
  return new Promise((resolve, reject) => {
    resolve(meals.map(function(meal) {
      var r = meal.toJSON()
      r.totalCalories = meal.getTotalCalories();
      return r
    })
    )
  })
};

module.exports = router;

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
      calories: Number(req.body.food.calories)
  })
  .then(food => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify({"id": food.id, "name": food.name, "calories": food.calories}));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({'error': 'Food Not Created'}))
  })
});
//Update food
router.patch('/:id', async (req, res) => {
  Food.findOne({
    where: {
      id: req.params.id
    }
  })
  .then((food)=> {
    return food.update({
      calories: req.body.food.calories,
      name: req.body.food.name
    })
  })
  .then(foodUpdated => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify({"id": foodUpdated.id, "name": foodUpdated.name, "calories": foodUpdated.calories}));
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send(JSON.stringify({'error': 'Food Not Created'}))
  })
});

//Delete food
router.delete('/:id', (req, res) => {
  return Food.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(food => {
    if (food) {
      res.setHeader('Content-Type', 'application/json');
      res.status(201).send(JSON.stringify({'success': 'Food Deleted'}));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(400).send(JSON.stringify({'error': 'Food Not Found'}))
    }
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(400).send({error})
  })
});

module.exports = router;

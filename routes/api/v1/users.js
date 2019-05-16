var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var Food = require('../../../models').Food;
var UserMeal = require('../../../models').UserMeal;
var pry = require('pryjs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', function(req, res){
  console.log(req.body.name + "manoj")
  if (req.body.password == req.body.password_confirmation) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
     User.create({
      name: req.body.name,
      email: req.body.email,
      passwordDigest: hash
     })
     .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.status(201).send(JSON.stringify({"user": user.name, "id": user.id, "success": 'Account Created'}));
     })
     .catch(error => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).send({ error });
     });
    });
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify({"error": 'Passwords Do Not Match'}));
  }
});

router.post('/:user_id/meals/:meal_id', function(req, res) {
  UserMeal.findOrCreate({
    where: {
      UserId: req.params.user_id,
      MealId: req.params.meal_id
    },
    defaults: {
      UserId: req.params.user_id,
      MealId: req.params.meal_id
    }
  })
  .then(userMeal => {
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify({'success': 'UserMeal Successfully Created'}));
  })
  .catch(error => {
   res.setHeader("Content-Type", "application/json");
   res.status(401).send(JSON.stringify({'error': 'UserMeal Not Created'}));
  })
});

router.get('/:user_id/meals', function(req, res) {
  User.findOne({
    where: {
      id: req.params.user_id,
    }
  })
  .then(user => {
    user.getMeals({
      attributes: ['name'],
      include: [{model:Food, attributes: ['name', 'calories'], through: { attributes: []}}]
    })
    .then(meals => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify(meals));
    })
    .catch(error => {
      res.setHeader('Content-Type', 'application/json');
      res.status(404).send(JSON.stringify({"error": "Invalid Request"}));
    })
  })
  .catch(error => {
    res.setHeader('Content-Type', 'application/json');
    res.status(404).send(JSON.stringify({"error": "Invalid Request"}));
  })
})


module.exports = router;

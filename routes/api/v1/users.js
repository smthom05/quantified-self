var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var UserMeal = require('../../../models').UserMeal;
var pry = require('pryjs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/', function(req, res){
  if (req.body.password == req.body.password_confirmation) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
     User.create({
      email: req.body.email,
      passwordDigest: hash
     })
     .then(user => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin": "http://localhost:3000");
      res.status(201).send(JSON.stringify({"success": 'Account Created'}));
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

module.exports = router;

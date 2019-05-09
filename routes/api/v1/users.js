var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
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

module.exports = router;

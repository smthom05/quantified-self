var express = require('express');
var router = express.Router();
var User = require('../../../models').User;
var pry = require('pryjs');
var bcrypt = require('bcrypt');
// Account Login
router.post('/', function(req, res) {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    bcrypt.compare(req.body.password, user.passwordDigest, function(err, response) {
      if (response) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).send(JSON.stringify({"user": user, "success": "Login Successful"}));
      } else {
        res.setHeader("Content-Type", "application/json");
        res.status(401).send(JSON.stringify("Invalid Credentials"));
      };
    });
  })
  .catch(error => {
    res.setHeader("Content-Type", "application/json");
    res.status(401).send(JSON.stringify("Invalid Credentials"));
  })
});
module.exports = router;

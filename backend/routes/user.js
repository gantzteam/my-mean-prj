const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();


router.post('/signup',(req,res,next)=> {
  // create user and store in database;
  bcrypt.hash(req.body.password,10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
        // BAD store password.
        // run ->
        // npm install --save bcrypt
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created!',
            result: result
          });
        }).catch(err => {
          res.status(500).json({
            error:err
          });
        });
    });

});

module.exports = router;

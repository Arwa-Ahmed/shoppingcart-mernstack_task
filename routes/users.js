var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt");
//get user schema by use user model
var User = require("../models/user");


//signup 
router.post('/signup', (req, res, next) => {

  //check unique username
  User.find({ username: req.body.username }).then(result => {
    if (result.length < 1) {
      //hash password
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          res.status(404).json({
            message: err
          })
        } else {
          //create user
          const user = new User({
            username: req.body.username,
            password: hash
          })
          //save user
          user.save().then(result => {
            console.log(result);
            res.status(200).json({
              message: 'user created'
            })
          }).catch(err => {
            res.status(404).json({
              message: err
            })

          })
        }
      })
    } else {
      res.status(404).json({
        message: 'this user already exists'
      })
    }

  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })

});

//login
router.get('/login', (req, res, next) => {
  User.find({ username: req.body.username }).then(user => {
    if (user.length >= 1) {
      //compare password ===> tesult >> true or false
      bcrypt.compare(req.body.password, user[0].password).then(result => {
        if (result) {
          //elmafrode hena bab3at bel json web token
          res.status(200).json({
            message: 'access signin'
          })

        } else {
          res.status(404).json({
            message: 'wrong password'
          })
        }
      }).catch(err => {
        res.status(404).json({
          message: err
        })
      })

    } else {
      res.status(404).json({
        message: 'wrong username'
      })

    }
  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })
})

//update user
router.patch('/updateuser/:id', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const newuser = {
      username: req.body.username,
      password: hash,
    }
    //update
    //mafrod akhod _id men jwt
    User.findOneAndUpdate({ _id: req.params.id }, { $set: newuser }).then(result => {
      console.log(result);
      if (result) {
        res.status(202).json({
          message: "user updated"
        })

      } else {
        res.status(404).json({
          message: 'user not found'
        })
      }

    }).catch(err => {
      res.status(404).json({
        message: err
      })
    })
  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })

})

//delete
router.delete('/deleteuser/:id', (req, res, next) => {
  User.findOneAndDelete({ _id: req.params.id }).then(result => {
    if (result) {
      res.status(200).json({
        message: 'user deleted'
      })
    } else {
      res.status(200).json({
        message: 'user not found'
      })
    }
  }).catch(err => {
    res.status(404).json({
      message: err
    })

  })
})
//admin
//get orders
router.get('/',(req,res,next)=>{
  //populate like join
  User.find().then(doc=>{
      res.status(200).json({
          users: doc
      })

  }).catch(err=>{
      res.status(404).json({
          message: err
      })
  })
})


module.exports = router;

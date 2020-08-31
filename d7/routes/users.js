var express = require("express");
var router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const UsersSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username: String,
    password:String,
    email:String,
    token: String,
    role:String,
  }); 

  const schema = Joi.object({
    username : Joi.string()
        .alphanum()
        .max(30)
        .required(),
    password:Joi.string()
        .min(3)
        .max(15)
        .required(),
    email: Joi.string()
          .email(),
    token:Joi.string(),
    role:Joi.string()
  });

//create
const User = mongoose.model("User", UsersSchema);

router.get("/", function(req, res){
  //create  
  const result = schema.validate(req.body);
  if(result.error){
    return res.status(400).send("parameter name is missing or invalid");
  }
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password:req.body.password,
    email:req.body.email,
    token: req.body.token,
    role:req.body.role,
  });

  user
    .save()
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

//get user by id 
router.get('/:id', function (req, res) {
    User.findOne({ _id: req.params.id })
      .exec()
      .then(user => {
        console.log("user: " + user.namef);
        res.status(200).send(user);
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  
});
router.get("/update:id", function(req, res){
  let id = req.params.id;
  const result = schema.validate(req.body);
  if(result.error){
    return res.status(400).send("parameter name is missing or invalid");
  }
  User.update({ _id: id }, { 
    username: req.body.username,
    password:req.body.password,
    email:req.body.email,
    token: req.body.token,
    role:req.body.role,
  })
    .exec()
    .then(result => {
      console.log(result);
      res.status().send("asdf");
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

router.get('/delete:id', function (req, res) {

  
  User.remove({ _id:req.params.id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

router.get('/list', function (req, res) {
  User.find()
    .exec()
    .then(user => {
      for (i = 0; i < user.length; i++)
        console.log(user[i].username + ", id: " + user[i]._id );
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

module.exports = router
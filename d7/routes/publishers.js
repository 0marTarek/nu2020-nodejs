var express = require('express')
var router = express.Router()
const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const publisherSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    address:String,
    email:String,
  });
  const schema = Joi.object({
    name: Joi.string(),
    address: Joi.string(),
  });
  const Publisher = mongoose.model("Publisher", publisherSchema);

router.get("/", function(req, res){
  //create  
  const result = schema.validate(req.body);
  if(result.error){
    return res.status(400).send("parameter name is missing or invalid");
  }
  const publisher = new Publisher({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    address:req.body.address,
    email:req.body.email,
  });

  publisher
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


router.get('/:id', function (req, res) {
    Publisher.findOne({ _isbn: req.params.id })
      .exec()
      .then(p => {
        console.log("publisher: " + p.name);
        res.status(200).send(p);
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
  Publisher.update({ _id: id }, { 
    name: req.body.name,
    address:req.body.address,
    email:req.body.email,

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
  
  Publisher.remove({ _id:req.params.id })
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

  Publisher.find()
    .exec()
    .then(p => {
      for (i = 0; i < p.length; i++)
        console.log(p[i].name + ", id: " + p[i]._id );
      res.status(200).json(p);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

module.exports = router
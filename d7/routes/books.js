var express = require("express");
var router = express.Router();
const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const BookSchema = mongoose.Schema({
    _isbn:mongoose.Schema.Types.ObjectId,
    title: String,
    publisher:String,
    year:Number,
    category: String,
    price:Number,
  }); 

const schema = Joi.object({
    title : Joi.string()
        .alphanum()
        .max(30)
        .required(),
    publisher:Joi.string()
        .alphanum()
        .max(30)
        .required(),
    year:Joi.number()
        .required(),
    category: Joi.string(),
    price:Joi.number(),

  });


const Book = mongoose.model("Book", BookSchema);

router.get("/", function(req, res){
  //create  
  const result = schema.validate(req.body);
  if(result.error){
    return res.status(400).send("parameter name is missing or invalid");
  }
  const book = new Book({
    _isbn: new mongoose.Types.ObjectId(),
    title: req.body.title,
    publisher:req.body.publisher,
    year:req.body.year,
    category: req.body.category,
    price:req.body.price,
  });

  book
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
    Book.findOne({ _isbn: req.params.id })
      .exec()
      .then(book => {
        console.log("book: " + book.title + ", price: " + book.price);
        res.status(200).send(book);
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
  Book.update({ _isbn: id }, { 
    title: req.body.title,
    publisher:req.body.publisher,
    year:req.body.year,
    category: req.body.category,
    price:req.body.price,
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
  
  Book.remove({ _isbn:req.params.id })
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
  Book.find()
    .exec()
    .then(book => {
      for (i = 0; i < book.length; i++)
        console.log(book[i].title + ", id: " + book[i]._isbn );
      res.status(200).json(book);
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
    });
});

module.exports = router
var express = require('express')
var router = express.Router()
const Joi = require("joi");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const categoriesSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title: String,
    parentCategory:String,
  });
router.get('/', function (req, res) {
  res.send('Categories home page')
})

router.get('/about', function (req, res) {
  res.send('About Categories')
})

module.exports = router
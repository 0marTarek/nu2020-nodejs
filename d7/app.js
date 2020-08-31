var express = require('express')
var router = express.Router()
const app = express();
app.use(express.json());

var books = require('./routes/books')
app.use('/books', books);

var users = require('./routes/users')
app.use('/users', users);

var publishers = require('./routes/publishers')
app.use('/publishers', publishers);

var categories = require("./routes/categories")
app.use("/categories", categories)

app.listen(3000);

const exp = require('express');
const app = exp();
let books = [
    {Isbn:1, Title:"science", author:'omar'},
    {Isbn:2, Title:"computer", author:'mohamed'},
    {Isbn:3, Title:"programming", author:'m'},
    {Isbn:4, Title:"technology", author:'sa'},
    {Isbn:5, Title:"fantasy", author:'kh'},
];
app.use(exp.json());

app.get("/", function(req, res){
    res.send("Book app.");
});

app.get("/books/:id", function(req, res){
    let id = parseInt(req.params.id);
    let book = books.find(elem=>elem.Isbn == id);
    res.send("Book: "+ book.Title);
});

app.post("/books/",function(req, res){
    let obj = {
        "Isbn":books.length +1 ,
        "Title":req.body.Title,
        "author": req.body.author
    };
    books.push(obj);
    res.send("added book: " + req.body.Title);
});
app.put("/books/:id",function(req, res){
    let ids = parseInt(req.params.id);
    const book = books.find(p=>p.Isbn == ids);
    book.Title = req.body.Title;
    book.author = req.body.author;
    res.json(book);
});

app.Delete("/books/:id",function(req, res){
    let ids = parseInt(req.params.id);
    const book = books.find(p=>p.Isbn == ids);
    const index = books.indexOf(book);
    books.splice(index,1);
    res.send(books);
});
app.listen(3000);
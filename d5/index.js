const express = require('express');
const app = express();
app.use(express.json());
let products = [
    {id:1, name:"Nodules", price:10.5},
    {id:2, name:"milk", price:20.5},
    {id:3, name:"egg", price:1.5},
    {id:4, name:"rice", price:10.5},
    {id:5, name:"pepsi", price:5.0},
];
app.get("/", function(req, res){
    res.send('hello world.');
});

app.get("/product/:id",function(req, res){
    let ids = parseInt(req.params.id);
    const product = products.find(p=>p.id == ids);
    res.send("hello product: " + product.name);
});
app.post("/product/:id",function(req, res){
    let obj = {
        "id":products.length +1 ,
        "name":req.body.name,
        "price": req.body.price
    };
    products.push(obj);
    res.json("added product: " + product.name);
});
app.put("/product/:id",function(req, res){
    let ids = parseInt(req.params.id);
    const product = products.find(p=>p.id == ids);
    let indx = product.id;
    products[indx].name = req.body.name;
    products[indx].price = req.body.price;
    res.json(products[indx]);
});
app.Delete("/product/:id",function(req, res){
    let ids = parseInt(req.params.id);
    const product = products.find(p=>p.id == ids);
    const index = products.indexOf(product);
    products.splice(index,1);
    res.json(products);
});

app.listen(3000);

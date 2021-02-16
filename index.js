const mongoose = require("mongoose");

const express = require('express') ;
const app = express() ; 
const port = 3000 ; 
var bodyParser = require('body-parser');

app.listen(port);

mongoose.connect("mongodb+srv://fakitayran:23323847lol@carparkcluster.aon22.mongodb.net/NodeJs",{ useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const { Schema } = mongoose;

const carSchema  = new Schema({
    name: String,
    price:Number,
    brand:String,
    model:Number,
    features:[
        {
            featureName:String,
            description:String
        }
    ],
    categoryId:String
}) ;

const car  = mongoose.model("Car",carSchema);

//List

app.get('/car',(req,res)=>{
    car.find({},(err,docs)=>{
        res.json(docs);
    });
});

//first

app.get('/car/:id',(req,res)=>{
    let id = req.params.id;

    car.findById(id,(err,doc)=>{
        if (doc !=null) {
            res.json(doc)
        }
        else {
            res.status(404).json(err)
        }
    });
});

//kategori Id ye göre arama

app.get("/car/search/:categoryId",(req,res)=>{
    let carcategoryId = req.params.categoryId;

    car.find({categoryId:carcategoryId},(err,docs)=>{
        if (docs !=null) {
            res.json(docs)
        }
        else {
            res.status(404).json("Seçtiğiniz kategoride araba bulunamıyor.")
        }
    });
})


//Add
app.post("/car",(req,res)=>{
    var newcar = new car({
        price : req.body.price,
        brand : req.body.brand,
        model : req.body.model,
        features:req.body.features,
        categoryId:req.body.categoryId
    });

    newcar.save((err,doc)=>{
        if(!err){
            res.json(doc)
        }
        else{
            res.json(err)
        }
    })
});

//Update

app.post("/car/update/:id",(req,res)=>{
    let productId = req.params.id;

    car.findById(productId,(err,doc)=>{
        if (doc != null) {
            doc.price = req.body.price,
            doc.brand = req.body.brand,
            doc.model = req.body.model,
            doc.features = req.body.features,
            doc.categoryId = req.body.categoryId
            doc.save((err,doc)=>{
                if (!err) {
                    res.json(doc)
                }
                else{
                    res.json(err)
                }
            });
        }
    });
});


//Delete

app.post("/car/delete/:id",(req,res)=>{
    let productId = req.params.id;

    car.deleteOne({_id:productId},(err,doc)=>{
        if (doc != null) {
            res.json(doc);
        }
        else{
            res.status(404).json(err);
        }
    });
});




const categoryShema  = new Schema({
    name:String
});

const category  = mongoose.model("Category",categoryShema);


//List

app.get("/category",(req,res)=>{
    category.find({},(err,doc)=>{
        if(doc != null){
            res.json(doc)
        }
    });
});

//First

app.get("/category/:id",(req,res)=>{
    let categoryId  = req.params.id

    category.findById(categoryId,(err,doc)=>{
        if(doc != null){
            res.json(doc)
        }
        else{
            res.json(err)
        }
    })
})


//Add

app.post("/category", (req, res) => {

    var newcategory = new category({
        name: req.body.name,
    });

    newcategory.save((err,doc)=>{
        if (!err) {
            res.json(doc)
        }
        else{
            res.json(err)
        }
    });
});

//Update

app.post("/category/update/:id",(req,res)=>{
    let categoryId = req.params.id

    category.findById(categoryId,(err,doc)=>{
        if(doc!=null){
            doc.name = req.body.name
            res.json(doc)
            doc.save()
        }
        else{
            res.json(err)
        }
    })

});

//Delete

app.post("/category/delete/:id",(req,res)=>{
    let categoryId = req.params.id

    category.deleteOne({_id:categoryId},(err,doc)=>{
        if(doc != null){
            res.json(doc)
        }
        else{
            res.status(404).json("Bu kategori silinemedi")
        }
    });
});

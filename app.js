//jshint esversion:6
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 80;
app.use(express.static("public"));
app.set('view engine', 'ejs');

//Mongoose initialisations
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const dbURL = process.env.DBURL;
mongoose.connect(dbURL);
const ProductSchema = new mongoose.Schema({
    ProductId: Number,
    ProductName: String,
    Description: String,
    cost: Number,
    imageURL: String,
    SellerName: String,
    SellerAddress: String,
    Mobile: Number
});
const NewProduct = mongoose.model('NewProduct', ProductSchema);


// const Product = {
//     ProductId: 225,
//     ProductName: "String",
//     Description: "ajlfsdkj asodijf;masd lj aosdjf asdjf jjw oirj",
//     cost: 500,
//     imageURL: "String",
//     SellerName: "String",
//     SellerAddress: "String",
//     Mobile: 9515306769
// }

// var newEntry = new NewProduct({
//     ProductId: 225, ProductName: "String", Description: "ajlfsdkj asodijf;masd lj aosdjf asdjf jjw oirj", cost: 500, imageURL: "String", SellerName: "String", SellerAddress: "String", Mobile: 9515306769
// });
// newEntry.save();

async function updateMarketData() {
    dbData = await NewProduct.find({});
    // console.log(dbData);
    const jsonString = JSON.stringify(dbData);
    fs.writeFile('./public/MarketProducts.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
}
updateMarketData();

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/login", function (req, res) {
    res.render("login", {});
});

app.get("/userRegister", function (req, res) {
    res.render("register", {});
})

app.get("/market", function (req, res) {
    res.sendFile(__dirname + "/market.html")
});

app.post("/", function (req, res) {
    console.log(req.body);
    res.send("Thankyou");
});

app.post("/userRegister", function (req, res) {
    console.log(req.body);
    res.send("Registration successful.");
});


app.listen(PORT, function () {
    console.log("App is running on port : " + PORT);
});
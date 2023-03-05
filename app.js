//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 80;
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post("/", function (req, res) {
    console.log(req.body);
    res.send("Thankyou");
});

app.get("/login", function (req, res) {
    res.render("login", {});
});

app.listen(PORT, function () {
    console.log("App is running on port : " + PORT);
});
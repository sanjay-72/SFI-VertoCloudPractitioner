//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require("mongoose");
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Console } = require('console');
const app = express();

//middleware
app.use(session({
    secret: toString(process.env.MYSECRET),
    resave: false,
    saveUninitialized: true
}));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
require('dotenv').config();
// app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 80;
app.use(express.static("public"));
app.set('view engine', 'ejs');

let usersId = 10000;
let productId = 720000;

//Mongoose initialisations
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

const UserSchema = new mongoose.Schema({
    usersId: Number,
    userName: String,
    age: Number,
    Location: String,
    Occupation: String,
    mobileNo: Number,
    emailId: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

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

// Passport.js initialisations
app.use(passport.initialize());
app.use(passport.session());

//Passport working
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const USER = await User.findById(id);
    done(null, USER);
});

passport.use(new localStrategy({
    usernameField: 'emailId',
    passwordField: 'password'
},
    function (username, password, done) {
        async function executer1() {
            let user = [];
            try {
                user = await User.findOne({ emailId: username });
            }
            catch (err) {
                return done(err);
            }
            function executer2(user) {
                // if (err) return done(err);
                if (!user) return done(null, false, { message: "Incorrect username" });

                bcrypt.compare(password, user.password, function (err, res) {
                    if (err) return done(err);
                    if (res === false) return done(null, false, { message: "Incorrect password" });
                    return done(null, user);
                });
            }
            executer2(user);
        }
        executer1();
    }
));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

function isLoggedOut(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
}

//Get routes
app.get("/", function (req, res) {
    // res.sendFile(__dirname + "/index.html");
    let temp = "Login👤";
    if (req.isAuthenticated()) {
        // console.log(req.user.userName);
        temp = req.user.userName
    }
    res.render("index", { name: temp });
});

app.get("/login", isLoggedOut, function (req, res) {
    res.render("login", { error: req.query.error });
});

app.get("/userRegister", function (req, res) {
    res.render("register", {});
});

app.get("/market", isLoggedIn, function (req, res) {
    res.sendFile(__dirname + "/marketIntro.html")
});

app.get("/market/:productName", isLoggedIn, function (req, res) {
    // console.log(req.params);
    async function getParticularProduct() {
        let myProductData = await NewProduct.find({ ProductName: req.params.productName }).sort({ 'cost': 1 });
        // res.send(myProductData);
        // console.log(myProductData);
        res.render("mainMarket", {
            productList: myProductData
        });
    }
    getParticularProduct();
});

app.get("/logout", isLoggedIn, function (req, res) {
    req.logout(req.user, err => {
        if (err) return next(err);
        res.redirect("/");
    });
});

app.get("/newProduct", isLoggedIn, function (req, res) {
    res.render("productEntry", {});
})

app.get("/myProducts", isLoggedIn, function (req, res) {
    async function getMyProducts() {
        let myProductData = await NewProduct.find({ Mobile: req.user.mobileNo });
        // res.send(myProductData);
        // console.log(myProductData);
        res.render("customerProductsView", {
            name: req.user.userName,
            productList: myProductData
        });
    }
    getMyProducts();
});

app.get("/market/contactSeller/:SellerMobile/:pID", isLoggedIn, function (req, res) {
    // console.log(req.params.SellerMobile);
    // console.log(req.params.pID);
    async function getSellerDetails() {
        let mySellerData = await NewProduct.findOne({ Mobile: req.params.SellerMobile, ProductId: req.params.pID });
        // console.log(mySellerData);
        if (mySellerData != null)
            res.render("sellerInfo", {
                name: req.user.userName,
                sellerData: mySellerData
            });
        else
            res.send("Sorry :( product already SOLD. Please refresh the market page.");
    }
    getSellerDetails();
})

//Post routes
app.post("/userRegister", function (req, res) {
    // console.log(req.body);
    async function verifyEmail() {
        let presence = await User.exists({ emailId: req.body.emailId });
        if (!presence) {
            usersId = usersId + 1;
            bcrypt.genSalt(10, function (err, salt) {
                if (err) return next(err);
                bcrypt.hash(req.body.password, salt, function (err, hash) {
                    if (err) return next(err);
                    var newEntry = new User({
                        usersId: usersId, userName: req.body.userName, age: req.body.age, Location: req.body.Location, Occupation: req.body.Location, Occupation: req.body.Occupation, mobileNo: req.body.mobileNo, emailId: req.body.emailId, password: hash
                    });
                    newEntry.save();
                    res.redirect("/login");
                })
            })
        }
        else {
            res.send("User already exits");
        }
    }
    verifyEmail();

});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/?loggedin=true",
    failureRedirect: "/login?error=true"
}));

// app.post('/login', function (req, res, next) {
//     console.log(req.url);
//     passport.authenticate('local', function (err, user, info) {
//         console.log("authenticate");
//         console.log(err);
//         console.log(user);
//         console.log(info);
//     })(req, res, next);
// });


app.post("/newProduct", isLoggedIn, function (req, res) {
    // console.log(req.body);
    productId = productId + 1;
    var newEntry = new NewProduct({
        ProductId: productId, ProductName: req.body.CropName, Description: req.body.Description, cost: parseFloat(req.body.Cost), imageURL: "String", SellerName: req.user.userName, SellerAddress: req.body.Location, Mobile: req.user.mobileNo
    });
    newEntry.save();
    // console.log(newEntry);
    res.sendFile(__dirname + "/thankYou.html");
});


app.post("/myProducts", isLoggedIn, function (req, res) {
    // console.log(req.body);
    // console.log(Object.keys(req.body));
    let deletingProducts = Object.keys(req.body);

    async function deleteGivenProducts() {
        for (var i = 0; i < deletingProducts.length; i++) {
            let doc = await NewProduct.deleteOne({ ProductId: parseInt(deletingProducts[i]) });
            // console.log(doc);
        }
    };
    deleteGivenProducts();
    res.sendFile(__dirname + "/thankYou.html");
});

app.listen(PORT, function () {
    console.log("App is running on port : " + PORT);
});
//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require("mongoose");
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Console } = require('console');
const { verify } = require('crypto');
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

//Twilio Client Initialisation
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

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

const DeviceSchema = new mongoose.Schema({
    userId: Number,
    userName: String,
    Location: String,
    Links: Array
});
const Device = mongoose.model('Device', DeviceSchema);

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

// var newDevice = new Device({
//     userId: req.user.usersId,
//     userName: req.user.userName,
//     Location: req.user.Location,
//     Links: ["https://thingspeak.com/channels/2065077/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15",
//         "https://thingspeak.com/channels/2065077/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15",
//         "https://thingspeak.com/channels/2065077/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15",
//         "https://thingspeak.com/channels/2065077/charts/4?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15"]
// });
// newDevice.save();

async function updateIds() {
    let LastProduct = await NewProduct.findOne({}).sort({ field: 'asc', _id: -1 }).limit(1);
    let LastUser = await User.findOne({}).sort({ field: 'asc', _id: -1 }).limit(1);
    // console.log(LastProduct.ProductId);
    // console.log(LastUser.usersId);
    if (LastProduct != null)
        productId = LastProduct.ProductId;
    if (LastUser != null)
        usersId = LastUser.usersId;
}
updateIds();

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
    res.render("getMobile", { error: req.query.error })
    // res.render("register", {});
});

app.get("/market", isLoggedIn, function (req, res) {
    res.sendFile(__dirname + "/marketIntro.html")
});

app.get("/market/:productName", isLoggedIn, function (req, res) {
    // console.log(req.params);
    // console.log(req.query);
    let myProductData = [];
    async function getParticularProduct() {
        if (req.query.sort == "PriceLowToHigh")
            myProductData = await NewProduct.find({ ProductName: req.params.productName }).sort({ 'cost': 1 });
        else if (req.query.sort == "PriceHighToLow")
            myProductData = await NewProduct.find({ ProductName: req.params.productName }).sort({ 'cost': -1 });
        else if (req.query.sort == "LatestFirst")
            myProductData = await NewProduct.find({ ProductName: req.params.productName }).sort({ 'ProductId': -1 });
        else if (req.query.sort == "OldestFirst")
            myProductData = await NewProduct.find({ ProductName: req.params.productName }).sort({ 'ProductId': 1 });
        else
            myProductData = await NewProduct.find({ ProductName: req.params.productName });
        // res.send(myProductData);
        // console.log(myProductData);
        res.render("mainMarket", {
            productList: myProductData,
            sortingKey: req.query.sort
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
});

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
});

app.get("/IOT", isLoggedIn, function (req, res) {
    async function getDeviceData() {
        let devicesInfo = await Device.findOne({ userId: req.user.usersId });
        // console.log(devicesInfo.Links);
        if (devicesInfo != null)
            res.render("agriIOT", { deviceList: devicesInfo.Links });
        else
            res.render("agriIOT", { deviceList: [] });
    }
    getDeviceData();

});

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
    successRedirect: "/market",
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

app.post("/sendOtp", function (req, res) {
    // console.log(req.body.mobile);
    var userMobile = req.body.mobile;
    userMobile = "+91" + userMobile;
    // console.log(userMobile);
    async function checkMobileExists() {
        let presence = await User.exists({ mobileNo: req.body.mobile });
        if (!presence) {
            client.verify.v2.services('VA5a2288a3067c06fa0f1257c6eaa9223a')
                .verifications
                .create({ to: userMobile, channel: 'sms' })
                .then(verification => {
                    // console.log(verification.status)
                    res.render("verifyMobile", { error: req.query.error, mobile: req.body.mobile });
                });
        }
        else {
            res.send("User already exits");
        }
    }
    checkMobileExists();
});

app.post("/verifyOtp", function (req, res) {
    // console.log(req.body);
    var userMobile = req.body.mobile;
    var otp = req.body.otp;
    let verified = false;
    client.verify.v2.services('VA5a2288a3067c06fa0f1257c6eaa9223a')
        .verificationChecks
        .create({ to: "+91" + userMobile, code: otp })
        .then(verification_check => {
            // console.log(verification_check.status);
            if (verification_check.status == "approved") {
                res.render("register", { mobile: userMobile });
            }
            else {
                res.render("verifyMobile", { error: true, mobile: userMobile });
            }
        });
});

app.listen(PORT, function () {
    console.log("App is running on port : " + PORT);
});
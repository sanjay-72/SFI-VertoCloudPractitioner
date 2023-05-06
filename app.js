//jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require("mongoose");
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { Console } = require('console');
const { verify } = require('crypto');
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)
const nodemailer = require("nodemailer");
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

// NodeMailer Initialisation
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_KEY
    },
});

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
    Mobile: Number,
    emailId: String,
    Quantity: Number,
    OtherName: String
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

const PaymentSchema = new mongoose.Schema({
    SellerName: String,
    SellerEmail: String,
    SellerMobile: Number,
    BuyerName: String,
    BuyerEmail: String,
    BuyerMobile: Number,
    SellerNotifiedStatus: String,
    ProductId: Number,
    ProductName: String,
    cost: Number,
    Quantity: Number
});
const Payment = mongoose.model("Payment", PaymentSchema);

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
//     ProductId: 225, ProductName: "String", Description: "ajlfsdkj asodijf;masd lj aosdjf asdjf jjw oirj", cost: 500, imageURL: "String", SellerName: "String", SellerAddress: "String", Mobile: 9515306769, emailId:"sanjaykumarkonakandla@gmail.com", Quantity:25
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

// const SampleTransaction = new Payment({
//     SellerName: "Sanjay Kumar",
//     SellerEmail: "sanjaykumarkonakandla@gmail.com",
//     SellerMobile: 9515306769,
//     BuyerName: "Durga Prasad",
//     BuyerEmail: "dpakurathi1616@gmail.com",
//     BuyerMobile: 7893924278,
//     SellerNotifiedStatus: "Yes",
//     ProductId: 7200016,
//     ProductName: "Apple",
//     cost: 40,
//     Quantity: 5
// });
// SampleTransaction.save();

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
    res.redirect('/market');
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
        let myProductData = await NewProduct.find({ Mobile: req.user.mobileNo }).sort({ 'ProductName': 1 });;
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

app.get("/success", function (req, res) {
    let mySellerData = "";
    async function insertPayment() {
        // console.log(req.query.Pid);
        mySellerData = await NewProduct.findOne({ ProductId: req.query.Pid });
        // console.log(mySellerData);
        if (mySellerData != null) {
            const MyTransaction = new Payment({
                SellerName: mySellerData.SellerName,
                SellerEmail: mySellerData.emailId,
                SellerMobile: mySellerData.Mobile,
                BuyerName: req.user.userName,
                BuyerEmail: req.user.emailId,
                BuyerMobile: req.user.mobileNo,
                SellerNotifiedStatus: "Yes",
                ProductId: mySellerData.ProductId,
                ProductName: mySellerData.ProductName,
                cost: mySellerData.cost,
                Quantity: req.query.quant,
            });
            // console.log(MyTransaction);
            MyTransaction.save();
        }
        else
            res.send("Sorry :( product already SOLD. Please refresh the market page.");
    }
    async function reduceStock() {
        let oldData = await NewProduct.findOne({ ProductId: req.query.Pid });
        let newQuant = oldData.Quantity - req.query.quant;
        await NewProduct.updateOne({ ProductId: req.query.Pid }, { Quantity: newQuant });
        let updated = await NewProduct.findOne({ ProductId: req.query.Pid });
        // console.log(updated);
        if (updated.Quantity <= 0) {
            await NewProduct.deleteOne({ ProductId: req.query.Pid });
        }
    }
    async function notifySeller() {
        mySellerData = await NewProduct.findOne({ ProductId: req.query.Pid });
        let info = await transporter.sendMail({
            from: `"Manager of Sales" <${process.env.EMAIL_ID}>`,
            to: mySellerData.emailId,
            subject: `You received order for Product with Product Id : ${mySellerData.ProductId}`,
            html: `
            <h1>Hello dear ${mySellerData.SellerName},</h1>
            <p>Greetings of the day. This email is to inform you that you have received an order for ${mySellerData.ProductName}(s) with a quantity requirement of ${req.query.quant}. <br>Payment for the order has been processed. You can find more details in this email or you can visit our Fruitful app to know more.</p>
            <h3>Customer Name   : ${req.user.userName} </h3>
            <h3>Customer email  : ${req.user.emailId} </h3>
            <h3>Customer mobile : ${req.user.mobileNo} </h3>
            <a href=${process.env.SERVER_URL}><button>Visit FruitFul Now</button></a>
            <p>This is system generated email by FruitFul.<p>
            `,
        });
        // console.log(info.messageId);
    }
    reduceStock();
    insertPayment();
    notifySeller();

    res.render("message", { myMessage: "Your payment is successful." });
});

app.get("/cancel", function (req, res) {
    res.render("message", { myMessage: "Your payment is cancelled." });
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
            res.render("message", { myMessage: "User already exists" });
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
        ProductId: productId, ProductName: req.body.CropName, Description: req.body.Description, cost: parseFloat(req.body.Cost), imageURL: "String", SellerName: req.user.userName, SellerAddress: req.body.Location, Mobile: req.user.mobileNo, emailId: req.user.emailId, Quantity: req.body.Quantity, OtherName: req.body.OtherName
    });
    newEntry.save();
    // console.log(newEntry);
    res.sendFile(__dirname + "/added.html");
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
    res.sendFile(__dirname + "/deleted.html");
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
            res.render("message", { myMessage: "User already exists" });
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


app.post("/create-checkout-session", isLoggedIn, async (req, res) => {
    async function checkMatch() {
        let mySellerData = await NewProduct.findOne({ ProductId: req.body.ProductId });
        if (mySellerData.Mobile == req.user.mobileNo) {
            // console.log(mySellerData.Mobile);
            // console.log(req.user.mobileNo);
            res.render("message", { myMessage: "😅 You are the seller of this product." });
        }
        else {
            try {
                let amount = parseInt(req.body.cost);
                let quantity = req.body.quantity;
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ["card"],
                    mode: "payment",
                    customer_email: req.body.emailId,
                    line_items: [{
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: req.body.ProductName + ` (${req.body.quantity} Kg)`,
                            },
                            unit_amount: amount * 100 * quantity,
                        },
                        quantity: 1,
                    }],
                    success_url: `${process.env.SERVER_URL}/success?Pid=${req.body.ProductId}&quant=${req.body.quantity}`,
                    cancel_url: `${process.env.SERVER_URL}/cancel`,
                })
                // console.log(session);
                res.redirect(session.url);
            } catch (e) {
                res.status(500).json({ error: e.message })
            }
        }
    }
    checkMatch();

})


app.listen(PORT, function () {
    console.log("App is running on port : " + PORT);
});
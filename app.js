const express = require('express');
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const dbUrl = 'mongodb://127.0.0.1:27017/Manikarnika';

// ========================database connection=================================
async function main(){
    await mongoose.connect(dbUrl);
}

main().then(()=>{
    console.log("Connection successfull");
}).catch( (err) =>{
    console.log("Connection unsuccefull");
});

// ========================all the imports================================= 
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs', ejsMate);

// ========================session=================================

const sessionConfig = {
    secret:  "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
//====================== Using session middleware================
app.use(session(sessionConfig));
app.use(flash());

// ========================passport for authentication==============================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ========================flash middleware==============================
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// ========================all the routes=================================

app.use('/', publicRoutes);
app.use('/admin', adminRoutes); 
app.use('/client',clientRoutes);

//========================Middlewares=============================
// app.all("*", (req,res,next)=>{
//     next(new ExpressError(404, "Page not found"));
// });

// app.use((err,req,res,next)=>{
//     let {statusCode =500 , message = "Somthing went wrong"} = err;
//     // res.status(statusCode).send(message);
//     res.render("listings/error.ejs",{statusCode,message});
// });

// ========================server=================================

app.listen(4000,()=>{
    console.log("listening on port 4000");
})



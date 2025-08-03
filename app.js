const express = require('express');
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");

// ========================all the imports================================= 
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs', ejsMate);


// ========================all the routes=================================
app.get("/",(req,res)=>{
    res.render("public/home.ejs");
})

app.get("/catalogue" , (req,res)=>{
    res.render("public/catalogue.ejs");
})

app.get("/signin" , (req,res)=>{
    res.render("public/signin.ejs");
})

app.get("/signup" , (req,res)=>{
    res.render("public/signup.ejs");
})

app.get("/dashboard" , (req,res)=>{
    res.render("client/dashboard.ejs");
})

app.get("/Artistdashboard" , (req,res)=>{
    res.render("artist/Artistdashboard.ejs");
})

app.get("/services" , (req,res)=>{
    res.render("public/service.ejs");
})

app.listen(4000,()=>{
    console.log("listening on port 4000");
})
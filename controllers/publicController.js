const Quote = require("../models/service");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.getHome = (req, res) => {
    res.render('public/home');
  };
  
module.exports.getServices = (req, res) => {
    res.render('public/service');
  };
  
module.exports.getCategories = (req, res) => {
    res.render('public/catalogue');
  };
  
module.exports.getLogin = (req, res) => {
    res.render('public/signin');
  };
  
module.exports.postRegister = wrapAsync(async (req, res) => {
  try{
    let {password} = req.body.register;
    const newUser = new User(req.body.register);
    const registeredUser = await User.register(newUser,password);
    console.log(registeredUser);
    // registeredUser.save();
    req.flash("success","Succefully Registered User");
    res.redirect("/login");
  }catch(e){
    req.flash("error",e.message);
    res.redirect("/register");
  } });

  module.exports.getRegister = async (req, res) => {
    res.render("public/signup.ejs");
  };

  
module.exports.postServices = async (req, res) => {
    const newQuote = new Quote(req.body.quote);
    await newQuote.save();
    res.render("public/thankyou");
  };

  module.exports.postLogin = async (req, res) => {
      req.flash("success", "Welcome Back!");
      res.redirect("/");
  };

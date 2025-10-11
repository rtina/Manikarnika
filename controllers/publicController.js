const User = require("../models/user.js");
const Artwork = require("../models/artworkModel.js");
const wrapAsync = require("../utils/wrapAsync.js");
const adminUsernames = ["tinarathod123", "adminuser123"];


module.exports.getHome = (req, res) => {
    res.render('public/home');
  };
  
module.exports.getServices = (req, res) => {
    res.render('public/service');
  };
  
module.exports.getLogin = (req, res) => {
    res.render('public/signin');
  };

module.exports.getCatelog = async (req,res)=>{
  let catelog = await Artwork.find({});
  res.render('public/catalogue',{catelog});
}
  
module.exports.postRegister = wrapAsync(async (req, res) => {
  try {
    let { password, username } = req.body.register;
    let role = "client";
    if (adminUsernames.includes(username)) {
      role = "admin";
    }
    const newUser = new User({ ...req.body.register, role });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "Successfully Registered User");
    res.redirect("/login");
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
});

  module.exports.getRegister = async (req, res) => {
    res.render("public/signup.ejs");
  };

  module.exports.postLogin = async (req, res) => {
  if (req.user && req.user.role === "admin") {
    req.flash("success", "Welcome Back, Admin!");
    return res.redirect("/admin/dashboard");
  }
  req.flash("success", "Welcome Back!");
  res.redirect("/");
};


const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const Quote = require("../models/service");

module.exports.getServices = async(req , res) =>{
   const currentUser = req.user; // Get the logged-in user
    res.render('client/services.ejs', { currentUser });
}

module.exports.postServices = async (req, res) => {
    const newQuote = new Quote(req.body.quote);
    await newQuote.save();
    res.render("client/thankyou");
  };

module.exports.getProfile = async(req,res)=>{
    let {id} = req.params;
    let user = await User.findById(id);
    res.render('client/profile.ejs',{user, currentUser: req.user });
}

// controllers/clientController.js

module.exports.getCurrentUser = (req, res) => {
  if (req.user) {
    return res.json({
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    });
  }
  res.json({});
};


module.exports.getChat = async(req,res)=>{
    if (!req.user) {
        req.flash("error", "You must be logged in to access the chat.");
        return res.redirect("/signin");
    }
    res.render('client/chat.ejs', { currentUser: req.user });
}

module.exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.userDate;
 
  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/clientProfile");
    }
    req.flash("success", "Profile updated successfully");
    res.redirect("/client/clientProfile/" + id);
  } catch (error) {
    console.log(error);
    req.flash("error", "An error occurred while updating the profile");
    res.redirect("/client/clientProfile/" + id);
  }
};
    

module.exports.logout = async(req,res)=>{
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have successfully logged out! Goodbye");
        res.redirect("/");
    });
}

// Add this route handler for fetching user's quote requests as JSON
module.exports.getHistory = async (req, res) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Find quotes for the logged-in user
    const quotes = await Quote.find({ username: currentUser.username }).sort({ createdAt: -1 });
    res.json(quotes);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
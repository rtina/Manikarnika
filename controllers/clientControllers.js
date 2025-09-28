const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');

module.exports.getServices = async(req , res) =>{
    res.render('client/services.ejs');
}

module.exports.getProfile = async(req,res)=>{
    let {id} = req.params;
    let user = await User.findById(id);
    res.render('client/profile.ejs',{user , currentUser: req.user});
}

module.exports.getChat = async(req,res)=>{
    res.render('client/chat.ejs');
}

module.exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body.userDate;
 
  try {
    const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/client/clientProfile/"+ id);
    }
    req.flash("success", "Profile updated successfully");
    res.redirect("/client/clientProfile/" + id);
  } catch (error) {
    console.log(error);
    req.flash("error", "An error occurred while updating the profile");
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
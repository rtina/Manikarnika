const User = require('../models/user.js');

module.exports.getDashboard = async (req , res)=>{
    res.render('admin/dashboard');
}

module.exports.getUsers = async (req, res)=>{
    let allUsers = await User.find({});
    res.render('admin/users.ejs' , {allUsers});
}

module.exports.getChats = async (req, res)=>{
    res.render('admin/chats.ejs');
}

module.exports.getTransactions = async (req, res)=>{
    res.render('admin/payment');
}

module.exports.getTeam = async (req, res)=>{
    res.render('admin/team');
}

module.exports.getProjects = async (req, res)=>{
    res.render('admin/project');
}

module.exports.logout = async(req,res)=>{
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have successfully logged out! Goodbye");
        res.redirect("/");
    });
}
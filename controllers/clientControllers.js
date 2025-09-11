module.exports.getDashboard = async(req , res) =>{
    res.render('client/dashboard.ejs');
}

module.exports.getProfile = async(req,res)=>{
    res.render('client/profile.ejs');
}

module.exports.getChat = async(req,res)=>{
    res.render('client/chat.ejs');
}
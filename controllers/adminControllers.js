module.exports.getDashboard = async (req , res)=>{
    res.render('admin/dashboard');
}

module.exports.getUsers = async (req, res)=>{
    res.render('admin/users');
}

module.exports.getTransactions = async (req, res)=>{
    res.render('admin/payment');
}
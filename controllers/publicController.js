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
  
module.exports.getRegister = (req, res) => {
    res.render('public/signup');
  };
  
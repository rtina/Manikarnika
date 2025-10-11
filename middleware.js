const Quote = require("./models/service.js");
const { registerSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash("error","You need to login first");
        return res.redirect("/login");
    }
    next();
}

module.exports.validateregistration = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
}

// Add this for admin-only protection
module.exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    req.flash('error', 'You are not authorized to view this page.');
    return res.redirect('/');
}
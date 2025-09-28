const Joi = require('joi');
const User = require('./models/user');

module.exports.registerSchema = Joi.object({
    register : Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string(),
        password: Joi.string().required(),
        address: Joi.object({
            street: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            country: Joi.string().required(),
            pincode: Joi.string().required(),
        }),
    })
})
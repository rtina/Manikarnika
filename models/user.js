const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  // User's name details
  username: {
    type: String,
    required: true,
    trim: true,
  },  
  // Contact and Authentication details
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  // Address details as a nested object
  address: {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
    },
  },
  
  // Timestamps for creation and update
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model("User", userSchema);
module.exports = User;
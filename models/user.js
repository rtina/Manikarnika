const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  
    email: {
      type: String,
      required: true,
      unique: true,
    },
  
    password: {
      type: String,
      required: true,
    },
  
    role: {
      type: String,
      enum: ['client', 'team'],
      default: undefined, // Optional (not required initially)
    },
  
    contactInfo: {
      type: String,
    },
  
    isActive: {
      type: Boolean,
      default: true,
    }
  
  }, { timestamps: true });
  
  const User= mongoose.model('User', userSchema);
  module.exports = User;
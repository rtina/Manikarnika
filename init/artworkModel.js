// models/artworkModel.js
const mongoose = require("mongoose");

// Schema for artworks
const artworkSchema = new mongoose.Schema({
  studioName: {
    type: String,
    default: "Manikarnika Studios", // Fixed name for all artwork
  },
  title: {
    type: String,
    required: true, // e.g., "Epic Fantasy Adventure"
  },
  year: {
    type: Number,
    required: true, // e.g., 2024
  },
  categories: [
    {
      type: String,
      enum: [
        "All Work",
        "2D Animation",
        "3D Animation",
        "Illustration",
        "VFX & Compositing",
        "Motion Graphics",
        "Character Design",
      ],
      required: true,
    },
  ],
  imageUrl: {
    type: String,
    required: true, // image or thumbnail link
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Collection for storing multiple artwork cards
const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;

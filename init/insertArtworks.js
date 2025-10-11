// insertArtworks.js
const mongoose = require("mongoose");
const Artwork = require("./artworkModel");

mongoose
  .connect("mongodb://localhost:27017/Manikarnika")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

const artworks = [
  {
    title: "Epic Fantasy Adventure",
    year: 2024,
    categories: ["3D Animation", "VFX & Compositing"],
    imageUrl: "https://images.pexels.com/photos/28655002/pexels-photo-28655002/free-photo-of-3d-animation-on-laptop-with-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A high-fantasy world brought to life through 3D artistry.",
    tags: ["Awarded", "Featured"],
  },
  {
    title: "Celestial Dreams",
    year: 2023,
    categories: ["Illustration"],
    imageUrl: "https://images.pexels.com/photos/12801673/pexels-photo-12801673.jpeg",
    description: "A dreamy digital illustration inspired by mythology.",
  },
  {
    title: "Mechanical Motion",
    year: 2022,
    categories: ["Motion Graphics"],
    imageUrl: "https://example.com/mechanical-motion.jpg",
    description: "A kinetic exploration of form, movement, and light.",
  },
  {
    title: "Faces of Imagination",
    year: 2024,
    categories: ["Character Design", "2D Animation"],
    imageUrl: "https://images.pexels.com/photos/30066061/pexels-photo-30066061.jpeg",
    description: "Character design process for a fantasy short film.",
  },
];

Artwork.insertMany(artworks)
  .then(() => {
    console.log("🎨 Artworks added successfully!");
    mongoose.connection.close();
  })
  .catch((err) => console.error(err));

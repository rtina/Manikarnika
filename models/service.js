const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const QuoteRequestSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
    },
    emailAddress: {
      type: String,
      required: [true, "Email Address is required"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    company: {
      type: String,
      trim: true,
    },
    serviceNeeded: {
      type: String,
      required: [true, "Service Needed is required"],
      enum: [
        "2d-animation",
        "3d-animation",
        "vfx-compositing",
        "illustration",
        "motion-graphics",
        "creative-direction",
        "other",
      ],
    },
    budgetRange: {
      type: String,
      enum: [
        "under-5k",
        "5k-10k",
        "10k-25k",
        "25k-50k",
        "50k-plus",
        ""
      ],
      default: "",
    },
    timeline: {
      type: String,
      enum: [
        "1-3-months",
        "3-6-months",
        "6-12-months",
        "12-plus-months",
        ""
      ],
      default: "",
    },
    projectDetails: {
      type: String,
      required: [true, "Project Details are required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "in-review", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Quote = mongoose.model("QuoteRequest", QuoteRequestSchema);
module.exports = Quote;
const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    eventName: {
      type: String,
      required: [true, "event Name is required"],
    },
    city: {
      type: String,
      required: [true, "City name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    website: {
      type: String,
    },
    location: {
      type: String,
      required: [true, "Location is required "],
    },
    date: {
      type: Array,
      required: [false, "Date id required"],
    },
    ticket: {
      type: String,
      required: [true, "ticket is required"],
    },
    timing: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "Pending",
    },
    social1: {
      type: String,
      required: [true, "social media is required"],
    },
    social2: {
      type: String,
    },
    social3: {
      type: String,
    },
  },
  { timestamps: true }
);

const eventModel = mongoose.model("events", eventSchema);

module.exports = eventModel;

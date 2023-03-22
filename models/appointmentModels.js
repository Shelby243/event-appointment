const mongoose = require("mongoose");

const appointmetSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
    eventInfo: {
      type: String,
      required: true,
    },
    userInfo: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const appointmentModel = mongoose.model("appoint", appointmetSchema);

module.exports = appointmentModel;

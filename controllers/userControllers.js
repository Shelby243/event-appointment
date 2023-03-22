const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const eventModel = require("../models/eventModel");
const appointmentModel = require("../models/appointmentModels");
const moment = require("moment");
//register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        message: `User alraedy exist`,
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      success: true,
      message: "Register Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid email or password",
        success: false,
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "Login success",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: `Error in login Controller ${error.message}`,
    });
  }
};

const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "User not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Auth error",
      success: false,
      error,
    });
  }
};

//Apply Event controller
const applyEventController = async (req, res) => {
  try {
    const newEvent = await eventModel({ ...req.body, status: "pending" });
    await newEvent.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-event-request",
      message: `${newEvent.eventName} has Applied for The Event account`,
      data: {
        eventId: newEvent._id,
        name: newEvent.eventName,
        onclickPath: "/admin/events",
      },
    });

    await userModel.findByIdAndUpdate(adminUser._id, { notification });

    res.status(201).send({
      success: true,
      message: "Event account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while applying for an event",
    });
  }
};

//notification controller

const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seenotification = user.seennotification;
    const notification = user.notification;
    seenotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

//delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notification",
      error,
    });
  }
};

//GET ALL EVENTS
const getAllEventsControllers = async (req, res) => {
  try {
    const events = await eventModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Events List Fetched Successfully",
      data: events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching events",
    });
  }
};

//BOOK APPOINTMENT
const bookAppointmentController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();

    const user = await userModel.findOne({ _id: req.body.eventInfo.userId });
    user.notification.push({
      type: "New-appointment-request",
      message: `A new appointment Request from ${req.body.userInfo.name} `,
      onclickPath: "/user/appointments",
    });
    await user.save();

    res.status(200).send({
      success: true,
      message: "Appointment book successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while booking appointment",
    });
  }
};
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const eventId = req.body.eventId;
    const appointments = await appointmentModel.find({
      eventId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointment no available at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointment available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Booking",
    });
  }
};
const userAppointmentController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in User Appointment",
    });
  }
};
module.exports = {
  loginController,
  registerController,
  deleteAllNotificationController,
  getAllNotificationController,
  applyEventController,
  authController,
  getAllEventsControllers,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentController,
};

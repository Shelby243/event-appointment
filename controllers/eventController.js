const appointmentModel = require("../models/appointmentModels");
const eventModel = require("../models/eventModel");
const userModel = require("../models/userModels");
const getEventInfoController = async (req, res) => {
  try {
    const event = await eventModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Event data fetch success",
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching event details",
    });
  }
};
const updateProfileController = async (req, res) => {
  try {
    const event = eventModel.findByIdAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      success: true,
      message: "Event Profile updated",
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Event Profile update issue",
      error,
    });
  }
};

//get single event
const getEventByIdController = async (req, res) => {
  try {
    const event = await eventModel.findOne({ _id: req.body.eventId });
    res.status(200).send({
      success: true,
      message: "Single event info success",
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in single event Info",
    });
  }
};
const eventAppointmentController = async (req, res) => {
  try {
    const event = await eventModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      eventId: event._id,
    });

    res.status(200).send({
      success: true,
      message: "Event appointments fetch successfully ",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in event appointment",
    });
  }
};
const updateStatusController = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id: appointments.userId });
    const notification = user.notification;
    notification.push({
      type: "status updated",
      message: `Your appointment has been updated ${status} `,
      onclickPath: "/event-appointment",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Status Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in update status",
    });
  }
};
module.exports = {
  getEventInfoController,
  updateProfileController,
  getEventByIdController,
  eventAppointmentController,
  updateStatusController,
};

const userModel = require("../models/userModels");
const eventModel = require("../models/eventModel");
const getAllUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "Users data",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while fetching users",
      error,
    });
  }
};
const getAllEventsController = async (req, res) => {
  try {
    const events = await eventModel.find({});
    res.status(200).send({
      success: true,
      message: "Events data list",
      data: events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "error while getting events data",
      error,
    });
  }
};
//account status
const changeAccountStatusController = async (req, res) => {
  try {
    const { eventId, status } = req.body;
    const event = await eventModel.findByIdAndUpdate(eventId, { status });
    const user = await userModel.findOne({ _id: event.userId });
    const notification = user.notification;
    notification.push({
      type: "event-account-request-updated",
      message: `Your Event Account Request Has ${status}`,
      onclickPath: "/notification",
    });

    user.isDoctor = status === "approved" ? true : false;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Account Status Updated",
      data: event,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in account status",
      error,
    });
  }
};

module.exports = {
  getAllEventsController,
  getAllUsersController,
  changeAccountStatusController,
};

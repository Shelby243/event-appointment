const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyEventController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllEventsControllers,
  bookAppointmentController,
  bookingAvailabilityController,
  userAppointmentController,
} = require("../controllers/userControllers");
const { middlewares, middlewares1 } = require("../middlewares/authMiddlewares");

//router object
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", middlewares1, authController);

//Apply Event || POST
router.post("/apply-event", middlewares, applyEventController);

//Notifications event || POST
router.post(
  "/get-all-notifications",
  middlewares1,
  getAllNotificationController
);
//delete event || POST
router.post(
  "/delete-all-notifications",
  middlewares1,
  deleteAllNotificationController
);

//GET ALL EVENTS
router.get("/getAllEvents", middlewares1, getAllEventsControllers);

//Book appointment

router.post("/book-appointment", middlewares1, bookAppointmentController);

//booking availability
router.post(
  "/booking-availability",
  middlewares1,
  bookingAvailabilityController
);

//Appointments lists
router.get("/user-appointments", middlewares1, userAppointmentController);

module.exports = router;

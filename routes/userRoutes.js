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
const authMiddlewares = require("../middlewares/authMiddlewares");

//router object
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddlewares, authController);

//Apply Event || POST
router.post("/apply-event", authMiddlewares, applyEventController);

//Notifications event || POST
router.post(
  "/get-all-notifications",
  authMiddlewares,
  getAllNotificationController
);
//delete event || POST
router.post(
  "/delete-all-notifications",
  authMiddlewares,
  deleteAllNotificationController
);

//GET ALL EVENTS
router.get("/getAllEvents", authMiddlewares, getAllEventsControllers);

//Book appointment

router.post("/book-appointment", authMiddlewares, bookAppointmentController);

//booking availability
router.post(
  "/booking-availability",
  authMiddlewares,
  bookingAvailabilityController
);

//Appointments lists
router.get("/user-appointments", authMiddlewares, userAppointmentController);
module.exports = router;

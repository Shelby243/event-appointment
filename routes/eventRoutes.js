const { Router } = require("express");
const express = require("express");
const {
  getEventInfoController,
  updateProfileController,
  getEventByIdController,
  eventAppointmentController,
  updateStatusController,
} = require("../controllers/eventController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

//POST SINGLE EVENT INFO

router.post("/getEventInfo", authMiddlewares, getEventInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", authMiddlewares, updateProfileController);

//POST GET SINGLE EVENT
router.post("/getEventById", authMiddlewares, getEventByIdController);

router.get("/event-appointment", authMiddlewares, eventAppointmentController);

//POST Update status
router.post("/update-status", authMiddlewares, updateStatusController);
module.exports = router;

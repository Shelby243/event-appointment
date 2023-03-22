const { Router } = require("express");
const express = require("express");
const {
  getEventInfoController,
  updateProfileController,
  getEventByIdController,
  eventAppointmentController,
  updateStatusController,
} = require("../controllers/eventController");
const { middlewares, middlewares1 } = require("../middlewares/authMiddlewares");

const router = express.Router();

//POST SINGLE EVENT INFO

router.post("/getEventInfo", middlewares1, getEventInfoController);

//POST UPDATE PROFILE
router.post("/updateProfile", middlewares1, updateProfileController);

//POST GET SINGLE EVENT
router.post("/getEventById", middlewares1, getEventByIdController);

router.get("/event-appointment", middlewares1, eventAppointmentController);

//POST Update status
router.post("/update-status", middlewares1, updateStatusController);
module.exports = router;

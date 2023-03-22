const express = require("express");
const {
  getAllEventsController,
  getAllUsersController,
  changeAccountStatusController,
} = require("../controllers/adminController");
const { middlewares, middlewares1 } = require("../middlewares/authMiddlewares");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", middlewares1, getAllUsersController);

//GET METHOD || EVENTS
router.get("/getAllEvents", middlewares1, getAllEventsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  middlewares1,
  changeAccountStatusController
);
module.exports = router;

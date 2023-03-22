const express = require("express");
const {
  getAllEventsController,
  getAllUsersController,
  changeAccountStatusController,
} = require("../controllers/adminController");
const authMiddlewares = require("../middlewares/authMiddlewares");

const router = express.Router();

//GET METHOD || USERS
router.get("/getAllUsers", authMiddlewares, getAllUsersController);

//GET METHOD || EVENTS
router.get("/getAllEvents", authMiddlewares, getAllEventsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  authMiddlewares,
  changeAccountStatusController
);
module.exports = router;

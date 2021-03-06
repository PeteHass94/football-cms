const express = require("express");

const UserController = require("../controllers/user");
const ClubController = require("../controllers/club");

const router = express.Router();

//create user
router.post("/signup", UserController.createUser);

//login user
router.post("/login", UserController.userLogin);

//get user
router.get("/user/:userid", UserController.getUser);

//get userClubs
router.get("/clubs", UserController.getUserClubs);

//get userTeams
router.get("/teams", UserController.getUserTeams);

module.exports = router;

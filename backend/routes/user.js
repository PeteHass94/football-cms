const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

//create user
router.post("/signup", UserController.createUser);

//login user
router.post("/login", UserController.userLogin);

//get userteams
router.get("/clubs", UserController.getUserClubs);

module.exports = router;

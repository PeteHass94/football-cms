const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

//create user
router.post("/signup", UserController.createUser);

//login user
router.post("/login", UserController.userLogin);

router.get("/teams", UserController.getUserTeams);

module.exports = router;

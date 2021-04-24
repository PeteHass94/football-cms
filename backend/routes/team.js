const express = require("express");




const checkAuth = require("../middleware/check-auth");


const TeamController = require("../controllers/team");

const router = express.Router();


//get by club id
router.get("/clubid/:id",
TeamController.getTeam);

//get by userid
router.get("/userid/:userid",
TeamController.getTeamFromCreator);


module.exports = router;

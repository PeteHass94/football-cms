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

//get by team id
router.get("/teamid/:id",
TeamController.getTeamById);

//UPDATE team by club userid with
router.put(
  "/push/teamid/:teamid/playerid/:playerid",
  TeamController.pushPlayerIdToTeam
);


module.exports = router;

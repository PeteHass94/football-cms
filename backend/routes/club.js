
const express = require("express");

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const ClubController = require("../controllers/club");

const router = express.Router();

//get by club id
router.get("/clubid/:id",
ClubController.getClub);

//get by userid
router.get("/userid/:userid",
ClubController.getClubFromCreator);

//add team
router.post("/userid/:userid/addteam",
ClubController.addTeam);

//get teams by userid
router.get("/userid/:userid/teams",
ClubController.getTeamsFromCreator);


//get teams by club userid and manager
router.get("/userid/:userid/teams",
ClubController.getTeamsFromCreator);

//get teams by club userid and manager
router.get("/userid/:userid/players",
ClubController.getPlayersFromCreator);

//UPDATE team by club userid with
router.put(
  "/addplayer/:playerid/toteam/:teamid",
  ClubController.addPlayerToTeamByCreator
);


module.exports = router;

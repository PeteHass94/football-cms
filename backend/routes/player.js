
const express = require("express");




const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const ClubController = require("../controllers/club");
const PlayerController = require("../controllers/player");

const router = express.Router();


//get by player id
router.get("/playerid/:id",
PlayerController.getPlayerById);


//get by player id
router.get("/teamid/:teamid",
PlayerController.getPlayersByTeamId);

//UPDATE team by club userid with
router.put(
  "/push/teamid/:teamid/playerid/:playerid",
  PlayerController.pushTeamIdtoPlayer
);


module.exports = router;

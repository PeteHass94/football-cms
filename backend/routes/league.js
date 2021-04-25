const express = require("express");

const leagueController = require("../controllers/league");

const router = express.Router();

//Post new League
router.post("/league", leagueController.createLeague);

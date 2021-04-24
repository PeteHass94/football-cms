
const express = require("express");




const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const ClubController = require("../controllers/club");
const PlayerController = require("../controllers/player");

const router = express.Router();

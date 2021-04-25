const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Club = require ('../models/club');

const User = require("../models/user");
const Team = require ('../models/team');
const Player = require("../models/player");

//getPlayer
exports.getPlayerById = (req, res, next) => {
  console.log(req.params.id);
  Player.findById(req.params.id).then(player => {
    console.log(player);
    if(player) {
      res.status(200).json({
        player: player
      });
    }
    else {
      res.status(404).json({message: 'Club not found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching player failed!"
    });
  });
}

//getPlayer
exports.getPlayersByTeamId = (req, res, next) => {
  console.log(req.params.teamid);

  Player.find({teams: req.params.teamid}).then(players => {
    console.log(players);
    if(players) {
      res.status(200).json({
        players: players
      });
    }
    else {
      res.status(404).json({message: 'Players not found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching players failed!"
    });
  });
}

// push teamid to Player
exports.pushTeamIdtoPlayer = (req, res, next) => {
  console.log("pushing teamid");
  console.log(req.body);
  Player.findOneAndUpdate(
     req.body.aplayerid,
    { $push: { teams: req.body.ateamid }},
    function (error, success) {
      if (error) {
        console.log("error");
        console.log(error);
    } else {
      console.log("success");
        console.log(success);
    }
    }
  )
  .catch(error => {
    res.status(500).json({
      message: "Pushing team failed!"
    });
  });

}

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const Team = require ('../models/team');

const User = require("../models/user");
const Club = require ('../models/club');


exports.getTeam = (req, res, next) => {
  console.log(req.params.id);
  Team.findById(req.params.id).then(team => {
    console.log(team);
    if(team) {
      res.status(200).json(team);
    }
    else {
      res.status(404).json({message: 'Team not found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching teams failed!"
    });
  });
}

exports.getTeamFromCreator = (req, res, next) => {
  console.log(req.params.id);
  Team.findById(req.params.id).then(team => {
    console.log(team);
    if(team) {
      res.status(200).json(team);
    }
    else {
      res.status(404).json({message: 'Team not found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching teams failed!"
    });
  });
}

//getPlayer
exports.getTeamById = (req, res, next) => {
  console.log(req.params.id);
  Team.findById(req.params.id).then(team => {
    console.log(team);
    if(team) {
      res.status(200).json({
        team: team
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

//add player id to team
exports.pushPlayerIdToTeam = (req, res, next) => {
  console.log("pushing player");
  console.log(req.body);
  Team.findOneAndUpdate(
    { _id: req.body.ateamid },
    { $push: { teams: req.body.aplayerid }},
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

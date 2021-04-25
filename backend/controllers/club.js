const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Club = require ('../models/club');

const User = require("../models/user");
const Team = require ('../models/team');
const Player = require ('../models/player');


exports.getClub = (req, res, next) => {
  console.log(req.params.id);
  Club.findById(req.params.id).then(club => {
    console.log(club);
    if(club) {
      res.status(200).json(club);
    }
    else {
      res.status(404).json({message: 'Club not found!'});
    }
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching clubs failed!"
    });
  });
}

exports.addTeam = (req, res, next) => {
  console.log("addTeam");
  console.log(req.params.userid);
  console.log(req.body);

  let theClub;
  let newUser;
  let newTeam;
  let json_response = [];

  console.log("createUser");
  //Club.findById(req.params.id)
  Club.find({ creator: req.params.userid})
    .then(club => {
      console.log(club);
      theClub = club;
    })
    .then(() => {
      // bcrypt.hash(req.body.password, 10)
      bcrypt.hash("password", 10)
      .then(hash => {
        const user = new User({
          //email: req.body.email,
          username: req.body.username,
          userType: req.body.userType,
          role: req.body.role,
          name: req.body.name,
          club: req.body.club,
          team: req.body.team,
          password: hash
        })
        //console.log(user.save());
        newUser = user;
        user.save()
          .then(user => {
            //console.log("saved user");
            json_response.push({
              user: user
            });
          })
          .then(() => {
            if(newUser.userType == "team") {
              const team = new Team({
                creator: theClub._id,
                clubName: newUser.club,
                teamName: newUser.team
              });
              newTeam = team;
              team.save()
                .then(team => {
                  json_response.push({
                    team: team
                  });
                })
                .then(() => {
                  theClub.teams.push(newTeam._id);
                  Club.updateOne( {_id: req.params.id}, theClub )
                  .then(result => {
                    console.log(result);

                    if (result.n > 0) {
                      json_response.push({
                        teamMessage: "added team to club"
                      });
                    }
                  })
                  .then(() => {
                    createUser201(json_response, res);
                  });
                })

            }
          })
          //then option
          .catch(error => {
            console.log(error);
            res.status(500).json({
              error: error,
              message: "Adding Club Failed"
            });
          })
      });


    }
  )

    console.log("end user creation");

  }

  function createUser201(json_response, res) {
    json_response.push({
      message:'User Created!'
    });
    console.log(json_response);
    res.status(201).json(json_response);
  }


  exports.getClubFromCreator = (req, res, next) => {
    //console.log(req.params.userid);
    Club.find({ creator: req.params.userid})
    .then(club => {
      //console.log(club);
      if(club) {
        res.status(200).json(club);
      }
      else {
        res.status(404).json({message: 'Club not found!'});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching clubs failed!"
      });
    });
  }

  exports.getTeamsFromCreator = (req, res, next) => {
    // console.log(req.params.userid);
    // console.log("getting teams");
    Club.findOne({ creator: req.params.userid})
    .then(club => {
      //console.log(club.clubName);
      Team.find({ clubName: club.clubName})
      .then(teamsData => {
        //team
        if(teamsData) {
          res.status(200).json({
            teams: teamsData
          });
        }
        else {
          res.status(404).json({message: 'Club not found!'});
        }
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching teams failed!"
      });
    });
  }

  exports.getPlayersFromCreator = (req, res, next) => {

    Club.findOne({ creator: req.params.userid})
    .then(club => {
      //console.log(club.clubName);
      Player.find({ clubName: club.clubName })
      .then(playersData => {
        //console.log(playersData);
        //players
        if(playersData) {
          res.status(200).json({
            players: playersData
          });
        }
        else {
          res.status(404).json({message: 'Club not found!'});
        }
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching players failed!"
      });
    });
  }

  exports.getTeamFromCreatorAndManagerId = (req, res, next) => {
    console.log(req.params.userid);
    console.log(req.params.managerid);
    // console.log("getting teams");
    Club.findOne({ creator: req.params.userid})
    .then(club => {
      //console.log(club.clubName);
      Team.findOne({ creator: req.params.managerid})
      .then(teamData => {
        //team
        if(teamData) {
          res.status(200).json({
            team: teamData
          });
        }
        else {
          res.status(404).json({message: 'Club not found!'});
        }
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching teams failed!"
      });
    });
  }

  exports.addPlayerToTeamByCreator = (req, res, next) => {

    //console.log(req.body);
    let newPlayer;
    let newTeam;
    let json_response = [];

    Player.findById(req.body[0].playerid)
    .then(player =>{
      newPlayer = player;
      newPlayer.teams.push(req.body[0].teamid);
      json_response.push({
        player: newPlayer
      });
    })
    .then(() => {
      Player.updateOne({_id: req.body[0].playerid }, newPlayer)
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          json_response.push({ message1: "Player update Successful!" });
        } else {
          res.status(401).json({ message: "Not Authorized" });
        }
      })
      .then(()=> {
        Team.findById(req.body[0].teamid)
        .then(team =>{
          newTeam = team;
          newTeam.players.push(req.body[0].playerid);
          json_response.push({
            team: newTeam
          });
        })
        .then(() => {
          Team.updateOne({_id: req.body[0].teamid }, newTeam)
          .then(result => {
            console.log(result);
            if (result.n > 0) {
              json_response.push({ message2: "Team update Successful!" });
            } else {
              res.status(401).json({ message: "Not Authorized" });
            }
          })
          .then(() => {
            createUser200(json_response,res);
          });
        })
      })
    })
    .catch(error => {
          res.status(500).json({
            message: "Pushing team failed!"
          });
    });

  }

  function createUser200(json_response, res) {
    json_response.push({
      message:'Player and Team Updated!'
    });
    console.log(json_response);
    res.status(200).json(json_response);
  }

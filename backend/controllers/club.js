const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Club = require ('../models/club');

const User = require("../models/user");
const Team = require ('../models/team');


exports.createClub = (req, res, next) => {
    console.log(req.body);
    console.log("create club ran ");


}


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
      .then(teamData => {
        //team
        if(teamData) {
          res.status(200).json({
            teams: teamData
          });
        }
        else {
          res.status(404).json({message: 'Club not found!'});
        }
      })


    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching clubs failed!"
      });
    });
  }

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Club = require("../models/club");
const Team = require("../models/team");
const Player = require("../models/player");

const router = require("../routes/user");
const ClubController = require("./club");


//create user /signup
exports.createUser = (req, res, next) => {
  console.log("req.body");
  //console.log(req.body);
  let newUser;
  let newClub;
  let newTeam;
  let newPlayer;

  let json_response = [];
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      //console.log(hash);
      const user = new User({
        username: req.body.username,
        userType: req.body.userType,
        role: req.body.role,
        name: req.body.name,
        dob: req.body.dob,
        league: req.body.league,
        club: req.body.club,
        team: req.body.team,
        password: hash
      })

      newUser = user;

      user.save()
        .then(user => {
          newUser = user;

        })
        .then(() => {
          //console.log(newUser.userType);
          //club
          if(newUser.userType == "club") {
            const club = new Club({
              creator: newUser._id,
              clubName: newUser.club
            });
            newClub = club;
            club.save()
              .then(club => {
                json_response.push({
                  club: club
                });
              })
              .then(() => {
                newUser.typeId.push(newClub._id);
                User.updateOne( {_id: newUser._id }, newUser )
                .then(()=> {
                  json_response.push({
                    user: newUser
                  });
                  createUser201(json_response, res);
                })
              });
          }

          //team
          else if(newUser.userType == "manager") {

            const team = new Team({
              creator: newUser._id,
              clubName: newUser.club,
              teamName: newUser.team,
              managers: [newUser.name],
              players: []
            });

            newTeam = team;
            team.save()
              .then(team => {
                console.log("adding team to club " + team.clubName);
                Club.findOneAndUpdate(
                  { clubName: team.clubName },
                  { $push: { teams: team._id} },
                  function (error, success) {
                    if (error) {
                        console.log("push team error");
                        console.log(error);
                    } else {
                        console.log("push team success");
                        console.log(success);
                    }
                  }
                );

                json_response.push({
                  team: team
                });
              })
              .then(() => {
                newUser.typeId.push(newTeam._id);
                User.updateOne( {_id: newUser._id }, newUser )
                .then(()=> {
                  json_response.push({
                    user: newUser
                  });
                  createUser201(json_response, res);
                })
              });

          }

          //player
          else if(newUser.userType == "player") {

            const player = new Player({
              creator: newUser._id,
              playerName: newUser.name,
              dob: newUser.dob,
              clubName: newUser.club,
              stats: { appearances: 0, goals: 0, assists: 0 }
            });

            newPlayer = player;
            player.save()
              .then(player => {
                console.log("adding player to club");
                Club.findOneAndUpdate(
                  { clubName: player.clubName },
                  { $push: { players: player._id} },
                  function (error, success) {
                    if (error) {
                      console.log("push player error");
                      console.log(error);
                    } else {
                        console.log("push player success");
                        console.log(success);
                    }
                  }
                );

                json_response.push({
                  player: player
                });
              })
              .then(() => {
                newUser.typeId.push(newPlayer._id);
                User.updateOne( {_id: newUser._id }, newUser )
                .then(()=> {
                  json_response.push({
                    user: newUser
                  });
                  createUser201(json_response, res);
                })
              });


          }
          //other
          else {
            createUser201(json_response, res);
          }


        })
        //then catch
        .catch(err => {
            console.log(err);
            res.status(500).json({
              message: "Invalid authentication credentials."
            });
        });

    });

    console.log("end user creation");

  }

  function createUser201(json_response, res) {
    json_response.push({
      message:'User Created!'
    });
    console.log(json_response);
    res.status(201).json(json_response);
  }


//user login /login
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  //console.log(User.find().select('club'));
  User.findOne( {username: req.body.username } )
    .then(user => {
      //console.log(user);
      //if user doesn't exist
      if (!user ) {
        return res.status(401).json({
          message: "User Auth failed"
        });
      }
      //if user exists
      fetchedUser = user;
      const passwordCheck = bcrypt.compareSync(req.body.password, user.password);
      //if user exists, compare hashed passwords
      return passwordCheck;

    })

    .then(result => {
      //if password is wrong
      if (!result ) {
        return res.status(401).json({
          message: "Password Auth failed"
        });
      }
      //if password is correct
      const token = jwt.sign(
        { username: fetchedUser.username, userId: fetchedUser._id },
        process.env.JWT_KEY,
        {expiresIn: "1h" }
      );
      //console.log(token);
      res.status(200).json({
        token: token,
        message: "Auth Success",
        expiresIn: 3600,
        userId: fetchedUser._id,
        user: fetchedUser
      });
    })

    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials."
        });
    });
}

//get User
exports.getUser = (req,res,next) => {
  const userQuery = User.findById(req.params.userid).then(user => {
    console.log(user);
      if(user) {
        res.status(200).json(user);
      }
      else {
        res.status(404).json({message: 'User not found!'});
      }
    })
    .catch(error => {
    res.status(500).json({
      message: "Fetching User failed!"
    });
  });

}

//get clubs
exports.getUserClubs = (req,res,next) => {
  const usersQuery = User.find({userType: "club"});
  let userMap = {};
  let i =0;

  usersQuery.then((documents) => {
    documents.forEach(function(user) {
      userMap[i] = user.club;
      i++;
    });
    return usersQuery.countDocuments();
  })
  .then(count => {
    //console.log(count);
    res.status(200).json({
      message: 'Users fetched successfully',
      noClubs: count,
      clubs: userMap
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching users failed!"
    });
  });
}

//get teams
exports.getUserTeams = (req,res,next) => {
  const usersQuery = User.find({userType: "manager"});
  let userMap = {};
  let i =0;

  usersQuery.then((documents) => {
    documents.forEach(function(user) {
      userMap[i] = user.team;
      i++;
    });
    return usersQuery.countDocuments();
  })
  .then(count => {
    //console.log(count);
    res.status(200).json({
      message: 'Users fetched successfully',
      noTeams: count,
      teams: userMap
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching users failed!"
    });
  });
}


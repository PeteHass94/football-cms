const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Club = require("../models/club");
const router = require("../routes/user");
const ClubController = require("./club");


//create user /signup
exports.createUser = (req, res, next) => {
  //console.log(req.body);
  let newUser;
  let newClub;
  let json_response = [];
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        //email: req.body.email,
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
      //console.log("new user");
      //console.log(user._id);
      newUser = user;

      user.save()
        .then(user => {
          json_response.push({
            user: user
          });
        })
        .then(() => {
          if(newUser.userType == "club") {
            //console.log(this.createClub)
            //createClub(newUser, res);
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
                createUser401(json_response, res);
              });
          }
        })
        //then option
        .catch(err => {
            console.log(err);
            res.status(500).json({
              message: "Invalid authentication credentials."
            });
        });

        // .then(result => {
        //   res.status(201).json({
        //     message: 'User Created!',
        //     result: result
        //   });
        // })
        // .catch(err => {
        //   console.log(err);
        //   res.status(500).json({
        //     message: "Invalid authentication credentials."
        //   });
        // });
    });



    console.log("end user creation");


  }

  function createUser401(json_response, res) {
    json_response.push({
      message:'User Created!'
    });
    console.log(json_response);
    res.status(201).json(json_response);
  }



//   function createClub(user, res) {
//     console.log("star club create");
//     //console.log(req.body);
//     console.log(user);
//     console.log("create club ran ");

//     const club = new Club({
//       creator: user._id,
//       clubName: user.club
//     });

//     club.save()
//     .then(createdClub => {
//       console.log(createdClub);
//       res.status(201).push({
//         message2: "Club added successfully",
//         //postId: createdPost._id
//         club: {
//           id: createdClub._id
//         }
//     });
//   })
//   .catch(error => {
//     res.status(500).json({
//       message: "Creating a post failed"
//     });
//   });

// }

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

// exports.getUser = (req,res,next) => {
//   User.findById(req.params.id).then(user => {
//     console.log(user);
//     if(post) {
//       res.status(200).json(post);

//     }

//   })

// }


// exports.getPost = (req, res, next) => {
//   Post.findById(req.params.id).then(post => {
//     console.log(post);
//     if(post) {
//       res.status(200).json(post);
//     }
//     else {
//       res.status(404).json({message: 'Post not found!'});
//     }
//   })
//   .catch(error => {
//     res.status(500).json({
//       message: "Fetching posts failed!"
//     });
//   });

// }

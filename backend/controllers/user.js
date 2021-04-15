const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");


//create user /signup
exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        //email: req.body.email,
        username: req.body.username,
        userType: req.body.userType,
        role: req.body.role,
        name: req.body.name,
        dob: req.body.dob,
        club: req.body.club,
        team: req.body.team,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User Created!',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            message: "Invalid authentication credentials."
          });
        });
    });


}

//user login /login
exports.userLogin = (req, res, next) => {
  let fetchedUser;
  //console.log(User.find());
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
        userId: fetchedUser._id
      });

    })

    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials."
        });
    });
}

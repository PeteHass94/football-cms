const path = require("path");

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const Post = require('./models/post');
const postsRoutes = require("./routes/globalPosts");
const userRoutes = require("./routes/user");

//club routes
const clubRoutes = require("./routes/club");

//team routes
const teamRoutes = require("./routes/team");
//player routes
const playerRoutes = require("./routes/player");

const { createShorthandPropertyAssignment } = require('typescript');

const app = express();
//if error, reset ip, if error remove ?retrywrites
mongoose.connect(
  "mongodb+srv://peter:" +
  process.env.MONGO_ATLAS_PW +
  "@fyp.lbttd.mongodb.net/FYP?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log('Connection failed ' + err);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use("/images", express.static(path.join("backend/images")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/club", clubRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/player", playerRoutes);

app.use("/", express.static(path.join(__dirname, "../dist/football-cms")));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../dist/football-cms/index.html"));

});





module.exports = app;


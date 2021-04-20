const Club = require ('../models/club');


exports.createClub = (req, res, next) => {
    console.log(req.body);
    console.log("create club ran ");

    const club = new Club({
      creator: req.userData.userId,
      clubName: req.body.club
    });

    club.save().then(createdClub => {
      console.log(createdClub);
      res.status(201).json({
        message: "Club added successfully",
        //postId: createdPost._id
        club: {
          id: createdClub._id,
          // title: createdPost.title,
          // content: createdPost.content,
          // imagePath: createdPost.imagePath
        }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Creating a post failed"
    });
  });

}

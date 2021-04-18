const jwt = require("jsonwebtoken");

module.exports = ((req, res, next) => {
  //url field
  //const token = req.query.auth
  try {
    //header field 2nd string after the keyword
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    console.log(decodedToken);
    req.userData = {username: decodedToken.username, userId: decodedToken.userId};

    next();

  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated."
    });
  }





});

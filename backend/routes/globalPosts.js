
const express = require("express");




const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");

const PostController = require("../controllers/globalPosts");

const router = express.Router();




//POST new post
router.post("", checkAuth,
 extractFile,
 PostController.createPost
 );

//USE/GET all
router.get("", PostController.getPosts);

//UPDATE
router.put(
  "/:id",
  checkAuth,
  extractFile,
  PostController.updatePost
);

//get single post
router.get("/:id",
PostController.getPost);

//DELETE
router.delete("/:id", checkAuth,
PostController.deletePost
  );


module.exports = router;

const Post = require('../models/globalPost');

exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  console.log("post create");
  console.log(req.body);
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId,
    club: req.body.club
  });

  //console.log(post);
  post.save().then(createdPost => {
    //console.log(result);
    res.status(201).json({
      message: "Post added successfully",
      //postId: createdPost._id
      post: {
        ...createdPost,
        id: createdPost._id,
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


exports.updatePost = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }

  //  console.log(req.file);
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });

  //console.log(post);
  Post.updateOne({ _id: req.params.id, creator: req.userData.userId  }, post).then(result => {
    //console.log(result);

    if (result.n > 0) {
      res.status(200).json({ message: "Update Successful!" });
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }

  })
  .catch(error => {
    res.status(500).json({
      message: "Could not update post."
    });
  });
}

exports.getPosts = (req, res, next) => {
  //console.log(req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const clubName = req.query.clubname;
  console.log(req.query.clubname);
  console.log(currentPage);
  console.log(pageSize);

  const postQuery = Post.find({ $or: [ {club: "global"}, {club: clubName} ]});
  //const postQuery = Post.find( {club: clubName});
  let fetchedPosts;

  if (pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      console.log(fetchedPosts);
      return Post.countDocuments();//.count();


    })
    .then(count => {
      res.status(200).json({
        message: 'Posts fetched successfully',
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
}

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    console.log(post);
      if(post) {
        res.status(200).json(post);
      }
      else {
        res.status(404).json({message: 'Post not found!'});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching posts failed!"
      });
  });

}


exports.deletePost = (req, res, next) => {
  //console.log(req.params.id);
  Post.deleteOne({_id: req.params.id, creator: req.userData.userId }).then(result => {
    //console.log(result);

    if (result.n > 0) {
      res.status(200).json({ message: "Post Deleted" });
    } else {
      res.status(401).json({ message: "Not Authorized" });
    }

  })
  .catch(error => {
    res.status(500).json({
      message: "Fetching posts failed!"
    });
  });
}


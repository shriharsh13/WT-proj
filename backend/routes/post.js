const express = require("express");
const Post = require("../models/post");

const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("",
checkAuth,
 (req, res, next) => {
    const post = new Post({
      content: req.body.content
    });
   post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost._id
   }); 
    });
  });
  
  router.put("/:id",checkAuth, (req,res,next)=>{
    const post= new Post({
      content: req.body.content,
      _id: req.body.id
      
    });
    Post.updateOne({_id: req.params.id}, post).then(result =>{
      console.log(result);
      res.status(200).json({message: 'Update Successful!'})
    })
  });
  
  router.get("", (req, res, next) => {
   Post.find()
   .then(documents => {
     console.log(documents);
     res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
   });
  });
  });
  
  router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
      if (post) {
        res.status(200).json(post);
      }else {
        res.status(404).json({message: 'Post not found!'});
      }
    });
  });
  
  router.delete("/:id",checkAuth, (req, res, next) => {
      Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Post deleted!" });
      });
  });

  module.exports = router;
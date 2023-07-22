const mongoose = require("mongoose");
const Post = require("../models/Post");
const User = require("../models/User");

//create post
const createPost = async (req, res) => {
  try {
    const { userId, caption, location, description, picturePath } = req.body;
    const user = await User.findById(userId).sort({ createdAt: -1 });
    const post = await Post.create({
      userId,
      caption,
      location,
      description,
      picturePath,
      userpicturePath: user.picturePath,
      comments: [],
      likes: {},
    });
    res.status(201).json({ post });
  } catch (err) {
    console.log(err);
  }
};

//get posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
  }
};

//get user posts
const getuserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({ userId: id });
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
  }
};
//deletePost
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({ post });
  } catch (err) {
    console.log(err);
  }
};

//like post
const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json({ updatedPost });
  } catch (err) {
    console.log(err);
  }
};

//addComment
const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, dp, comment } = req.body;
    const post = await Post.findById(id);
    const comments = post.comments;
    comments.push({ name, dp, comment });

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { comments: comments },
      { new: true }
    );
    res.status(200).json({ updatedPost });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPost,
  getPosts,
  getuserPosts,
  likePost,
  deletePost,
  addComment,
};

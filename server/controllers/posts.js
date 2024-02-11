import express from "express";
import mongoose from "mongoose";
import PostMessage from "../models/postModel.js";
import { ObjectId } from "mongodb";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find().sort({ createdAt: -1 });
    // console.log(postMessages)
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  const { username } = req.params;

  try {
    const searchMessages = await PostMessage.find({ user: username });
    console.log(searchMessages);
    res.status(200).json(searchMessages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const searchPosts = async (req, res) => {
  const hashtag = req.query.hashtag;

  try {
    const searchMessages = await PostMessage.find({ hashtags: hashtag });
    console.log(searchMessages);
    res.status(200).json(searchMessages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPostLikes = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);
    if (!post) {
      res.status(200).json(null);
    }
    res.status(200).json(post.likes);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  // if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No post with that ID" });

  const post = await PostMessage.findById(id);
  console.log(post);
  post.likes.push(username);
  // const user = await UserModel.findById(id);

  // const index = post.likes.find((eachUser) => eachUser === user.username);

  // if (index === -1) {
  //   post.likes.push(user.username);
  // } else {
  //   post.likes = post.likes.filter((eachUser) => eachUser !== user.username);
  // }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const createPosts = async (req, res) => {
  const post = req.body;
  console.log(post);

  if (!post.image || !post.content) {
    return res.status(400).json({ message: "Please upload all details" });
  }

  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editPost = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("Invalid post ID");
  }

  try {
    const editedPost = await PostMessage.findByIdAndUpdate(
      id,
      { content: content },
      { new: true }
    );

    res.status(200).json(editedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");

  try {
    const deletedPost = await PostMessage.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "No post found with that ID" });
    }
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default router;

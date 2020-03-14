const express = require("express");
const validateUserId = require("../middleware/validateUserId-middleware")
const validateUser = require("../middleware/validateUser-middleware")
const validatePost = require("../middleware/validatePost-middleware")

const router = express.Router();

const Users = require("./userDb")
const Posts = require("../posts/postDb")

router.post("/", validateUser, (req, res) => {
  const newUser = req.body
  Users.insert(newUser)
    .then(id => {
      res.status(201).json(id)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: "Error adding new user" })
    })
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const newPost = req.body
  Posts.insert(newPost)
    .then(id => {
      res.status(201).json(id)
    })
    .catch(err => {
      console.log(err)
      res.status(404).json({ message: "Error adding new post" })
    })
});

router.get("/", (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Unable to get users" })
    })
});

router.get("/:id", validateUserId, (req, res) => {
  const user = req.user
  res.status(200).json(user)
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const id = req.params.id
  Users.getUserPosts(id)
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: `Unable to get user by id of ${id} posts` })
    })
});

router.delete("/:id", validateUserId, (req, res) => {
  const id = req.params.id
  Users.remove(id)
    .then(x => {
      res.status(201).json({ message: `User ${id} successfully deleted`, status: x })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: `Unable to delete user of id ${id}` })
    })
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  const id = req.params.id
  const user = req.body
  Users.update(id, user)
    .then(x => {
      res.status(203).json({ message: `User ${id} successfully updated`, status: x })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: `Unable to update user of id ${id}` })
    })
});

module.exports = router;

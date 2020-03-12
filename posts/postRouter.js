const express = require("express");
const validatePostId = require("../middleware/validatePostId-middleware")

const router = express.Router();

const Posts = require("./postDb")

router.get("/", (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Unable to fetch posts" })
    })
});

router.get("/:id", validatePostId, (req, res) => {
  const post = req.post
  res.status(200).json(post)
});

router.delete("/:id", validatePostId, (req, res) => {
  const id = req.params.id
  Posts.remove(id)
    .then(x => {
      res.status(201).json({ message: `Post of id ${id} has been deleted`, status: x })
    })
    .catch(err => {
      res.status(500).json({ message: `Unable to delete post of id ${id}` })
    })
});

router.put("/:id", validatePostId, (req, res) => {
  const id = req.params.id
  const post = req.body
  if (!post.user_id) {
    post.user_id = req.post.user_id
  }
  Posts.update(id, post)
    .then(x => {
      res.status(203).json({ message: `Successfully updates post of id ${id}`, status: x })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: `Unable to update post of id ${id}` })
    })
});

module.exports = router;

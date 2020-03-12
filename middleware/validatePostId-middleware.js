const Posts = require('../posts/postDb')
module.exports = function validatePostId(req, res, next) {
  const id = req.params.id
  if (!req.body.id) {
    req.body.id = id
  }
  Posts.getById(id)
    .then(post => {
      req.post = post
      next()
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: "invalid post id" })
    })
}
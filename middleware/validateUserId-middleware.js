const Users = require('../users/userDb')

module.exports = function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => {
      console.log(err)
      res.status(400).json({ message: "invalid user id" })
    })
}
module.exports = function validatUser(req, res, next) {
  const user = req.body
  if (!user) {
    res.status(400).json({ message: "missing user data" })
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  }
}
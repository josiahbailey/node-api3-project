module.exports = function logger(req, res, next) {
  const method = req.method
  const endpoint = req.originalUrl
  const time = new Date()
  console.log(`${method} to ${endpoint}, ${time}`)
  next()
}
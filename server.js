const express = require("express");
const logger = require("./middleware/logger-middleware")

const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter")

const server = express();
server.use(express.json(), logger)
server.use("/api/users", userRouter)
server.use("/api/posts", postRouter)

server.get("/", (req, res) => {
  res.send(`<h2>Let"s write some middleware!</h2>`);
});

module.exports = server;

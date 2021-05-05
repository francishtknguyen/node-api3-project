const express = require("express");
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");

const router = express.Router();

router.get("/", logger, (req, res) => {
  Users.get()
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", logger, validateUserId, (req, res) => {
  res.json(req.user);
});

router.post("/", (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put("/:id", (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete("/:id", (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get("/:id/posts", (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post("/:id/posts", (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

function errorHandler(err, req, res, next) {
  //next-disable-lint
  res.status(err.status || 500).json({
    note: "You've Got an Error",
    message: err.message,
    stack: err.stack,
  });
}

router.use(errorHandler);

module.exports = router;

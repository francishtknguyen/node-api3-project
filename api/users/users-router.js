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

router.post("/", logger, validateUser, (req, res, next) => {
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put("/:id", logger, validateUserId, validateUser, (req, res, next) => {
  Users.update(req.user.id, req.body)
    .then(() => {
      return Users.getById(req.user.id);
    })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
});

router.delete("/:id", logger, validateUserId, (req, res, next) => {
  Users.remove(req.user.id)
    .then(() => res.status(200).json(req.user))
    .catch(next);
});

router.get("/:id/posts", logger, validateUserId, (req, res, next) => {
  Users.getUserPosts(req.user.id)
    .then((post) => res.status(200).json(post))
    .catch(next);
});

router.post(
  "/:id/posts",
  logger,
  validateUserId,
  validatePost,
  (req, res, next) => {
    Posts.insert({ ...req.body, user_id: req.params.id })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch(next);
  }
);

function errorHandler(err, req, res, next /*eslint-disable-line*/) {
  res.status(err.status || 500).json({
    note: "You've Got an Error",
    message: err.message,
    stack: err.stack,
  });
}

router.use(errorHandler);

module.exports = router;

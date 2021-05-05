const yup = require("yup");
const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  console.log(`
  [${req.method}] request to ${req.baseUrl} endpoint on ${Date.now()}
  `);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: `User with id ${req.params.is} does not exist` });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

module.exports = { logger, validateUserId, validateUser, validatePost };

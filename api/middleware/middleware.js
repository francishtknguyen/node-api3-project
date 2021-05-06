const yup = require("yup");
const Users = require("../users/users-model");
const Posts = require("../posts/posts-model");

function logger(req, res, next) {
  // const date = Date.now();
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
        .json({ message: `User with id ${req.params.id} does not exist` });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
}

const userSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("name required")
    .min(3, "name must be 3 chars")
    .max(40, "name must be under 40 chars"),
});

async function validateUser(req, res, next) {
  try {
    const userValidated = await userSchema.validate(req.body, {
      stripUnknown: true,
    });
    req.body = userValidated;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
}

const textSchema = yup.object({
  text: yup
    .string()
    .trim()
    .required("text required")
    .min(3, "text must be at least 3 chars")
    .max(40, "text must be under 40 chars"),
});

async function validatePost(req, res, next) {
  try {
    const postValidated = await textSchema.validate(req.body, {
      stripUnknown: true,
    });
    req.body = postValidated;
    next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
}

module.exports = { logger, validateUserId, validateUser, validatePost };

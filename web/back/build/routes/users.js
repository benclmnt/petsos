"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsersRoutes = getUsersRoutes;

var _express = _interopRequireDefault(require("express"));

var _logger = _interopRequireDefault(require("../logger"));

var _db = require("../db");

var _queries = require("../db/queries");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUsersRoutes() {
  const router = _express.default.Router();

  router.post('/login', login);
  router.post('/register', register);
  router.get('/:userId', getUserById);
  router.get('', listAllUsers);
  return router;
}

async function register(req, res) {
  const {
    body
  } = req;
  const params = [body.name, body.email, body.password];

  try {
    await (0, _db.query)(_queries.registerUser, params);
  } catch (err) {
    _logger.default.error(err);

    return buildUsersErrorObject(res, {
      status: 400,
      error: 'Email already registered.'
    });
  }

  const user = await (0, _db.query)(_queries.queryUserByEmail, [body.email]);
  return buildUsersSuccessObject(res, {
    user
  });
}

async function login(req, res) {
  const {
    body
  } = req;
  const users = await (0, _db.query)(_queries.queryUserByEmail, [body.email]);
  checkUserExists(res, users);

  if (body.password !== users[0].password) {
    return buildUsersErrorObject(res, {
      status: 401,
      error: 'Wrong email or password'
    });
  }

  return buildUsersSuccessObject(res, {
    user: users[0]
  });
}

async function getUserById(req, res) {
  const {
    userId
  } = req.params; // parse the userId. Return an error if its not a number

  if (isNaN(userId)) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: 'the API path /users do not support non-numeric userId'
    });
  }

  const users = await (0, _db.query)(_queries.queryUserById, [req.params.userId]);
  checkUserExists(res, users);
  return buildUsersSuccessObject(res, {
    user: users[0]
  });
}

async function listAllUsers(req, res) {
  const users = await (0, _db.query)(_queries.getAllUsers);
  return buildUsersSuccessObject(res, {
    user: users
  });
}

/**
 * PRIVATE FUNCTIONS
 */
function buildUsersErrorObject(res, {
  status,
  error
}) {
  const errorResp = {
    error
  };
  return res.status(status).json(errorResp);
}

function buildUsersSuccessObject(res, {
  status,
  user
}) {
  delete user.password;
  return res.status(status || 200).json(user);
}

function checkUserExists(res, users) {
  if (users.length === 0) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: 'Cannot find user'
    });
  }
}
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
  router.get('/:username', getUserByUsername);
  router.post('/:username/address', upsertUserAddress);
  router.get('', listAllUsers);
  return router;
}
/**
 * Register user using username, email, password
 */


async function register(req, res) {
  const {
    username,
    email,
    password
  } = req.body;
  const params = [username, email, password];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await (0, _db.query)(_queries.registerUser, params);
  } catch (err) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: 'Username already registered.'
    });
  }

  const user = await (0, _db.query)(_queries.queryUserByEmail, [email]);
  return buildSuccessResponse(res, {
    user: buildUsersObject(user)
  });
}
/**
 * Login using email
 */


async function login(req, res) {
  const {
    email,
    password
  } = req.body;

  if (checkMissingParameter([email, password])) {
    return handleMissingParameter(res);
  }

  const users = await (0, _db.query)(_queries.queryUserByEmail, [email]);
  checkUserExists(res, users);

  if (password !== users[0].password) {
    return buildUsersErrorObject(res, {
      status: 401,
      error: 'Wrong email or password'
    });
  }

  return buildSuccessResponse(res, {
    user: buildUsersObject(users[0])
  });
}

async function getUserByUsername(req, res) {
  const {
    username
  } = req.params; // GG SQL INJECTION!

  if (checkMissingParameter([username])) {
    return handleMissingParameter(res);
  }

  const users = await (0, _db.query)(_queries.queryUserByUsername, [username]);
  checkUserExists(res, users);
  return buildSuccessResponse(res, {
    user: buildUsersObject(users[0])
  });
}

async function listAllUsers(req, res) {
  let users = await (0, _db.query)(_queries.getAllUsers);
  users = users.map(buildUsersObject);
  return buildSuccessResponse(res, {
    user: users
  });
}

async function upsertUserAddress(req, res) {
  const {
    username,
    address,
    city,
    country,
    postal
  } = req.body; // GG SQL INJECTION!

  const params = [username, address, city, country, postal];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await (0, _db.query)(_queries.upsertUserAddress, params);
  const users = await (0, _db.query)(_queries.queryUserByUsername, [username]);
  return buildSuccessResponse(res, {
    user: buildUsersObject(users[0])
  });
}

/**
 * PRIVATE FUNCTIONS
 */
function buildUsersErrorObject(res, {
  status,
  error
}) {
  _logger.default.error(error);

  const errorResp = {
    kind: 'Error',
    error
  };
  return res.status(status).json(errorResp);
}

function buildUsersObject(user) {
  const obj = {
    kind: 'User',
    ...user,
    selfLink: `/users/${user.username}`
  };
  delete obj.password;
  return obj;
}

function buildSuccessResponse(res, {
  status,
  user
}) {
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

function checkMissingParameter(array) {
  return array.some(param => param === undefined || param === null);
}

function handleMissingParameter(res) {
  return buildUsersErrorObject(res, {
    status: 400,
    error: 'Missing some required parameters'
  });
}
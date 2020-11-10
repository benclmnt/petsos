"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsersRoutes = getUsersRoutes;

var _express = _interopRequireDefault(require("express"));

var _db = require("../db");

var _pets = require("./pets");

var _queries = require("../db/queries");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getUsersRoutes() {
  const router = _express.default.Router();

  router.post("/login", login);
  router.post("/register", register);
  router.use("/:username", (0, _pets.getUsersPetsRoutes)());
  router.get("/:username", getUserInfo);
  router.delete("/:username", deleteUser);
  router.patch("/:username", editUserDetails);
  router.get("/:username/orders", retrieveOrders);
  router.post("/setRatingAndReview", putRatingAndReview);
  router.get("", listAllUsers);
  return router;
}

async function putRatingAndReview(req, res) {
  const {
    pouname,
    petname,
    start_date,
    end_date,
    rating,
    review
  } = req.body; // GG SQL INJECTION!

  const params = [pouname, petname, start_date, end_date, rating, review];
  console.log(params);

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    await (0, _db.query)(_queries.setRatingAndReview, params);
  } catch (err) {
    return (0, _utils.buildErrorObject)(res, {
      status: 400,
      error: err.message
    });
  }

  const orders = await (0, _db.query)(_queries.queryOrders, [pouname]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: orders
  });
}

async function retrieveOrders(req, res) {
  const {
    username
  } = req.params;

  if ((0, _utils.checkMissingParameter)([username])) {
    return (0, _utils.handleMissingParameter)(res);
  }

  const orders = await (0, _db.query)(_queries.queryOrders, [username]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: {
      past_orders: orders.filter(order => order.is_win && order.is_past),
      future_orders: orders.filter(order => order.is_win && !order.is_past),
      pending_bids: orders.filter(order => !order.is_win && !order.is_past),
      failed_bids: orders.filter(order => !order.is_win && order.is_past)
    }
  });
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

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    await (0, _db.query)(_queries.registerUser, params);
  } catch (err) {
    return (0, _utils.buildErrorObject)(res, {
      status: 400,
      error: "Username already registered."
    });
  }

  const users = await (0, _db.query)(_queries.queryUserByUsername, [username]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: buildUsersObject(users[0])
  });
}
/**
 * Delete user account
 */


async function deleteUser(req, res) {
  const {
    username
  } = req.params;
  const params = [username];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  await (0, _db.query)(_queries.deleteUser, [username]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: "success"
  });
}
/**
 * Login using username
 */


async function login(req, res) {
  const {
    username,
    password
  } = req.body;

  if ((0, _utils.checkMissingParameter)([username, password])) {
    return (0, _utils.handleMissingParameter)(res);
  }

  const users = await (0, _db.query)(_queries.queryUserByUsername, [username]);

  if (users.length === 0) {
    return (0, _utils.buildErrorObject)(res, {
      error: "Cannot find user"
    });
  }

  if (password !== users[0].password) {
    return (0, _utils.buildErrorObject)(res, {
      status: 401,
      error: "Wrong email or password"
    });
  }

  return (0, _utils.buildSuccessResponse)(res, {
    data: buildUsersObject(users[0])
  });
}

async function getUserInfo(req, res) {
  const {
    username
  } = req.params; // GG SQL INJECTION!

  if ((0, _utils.checkMissingParameter)([username])) {
    return (0, _utils.handleMissingParameter)(res);
  }

  const users = await (0, _db.query)(_queries.queryUserByUsername, [username]);

  if (users.length === 0) {
    return (0, _utils.buildErrorObject)(res, {
      error: "Cannot find user"
    });
  }

  return (0, _utils.buildSuccessResponse)(res, {
    data: buildUsersObject(users[0])
  });
}

async function listAllUsers(req, res) {
  const users = await (0, _db.query)(_queries.getAllUsers);
  return (0, _utils.buildSuccessResponse)(res, {
    data: users.map(buildUsersObject)
  });
}

async function editUserDetails(req, res) {
  const {
    username
  } = req.params; // GG SQL INJECTION!

  const {
    email,
    address,
    city,
    country,
    postal_code,
    credit_card = ""
  } = req.body;
  const params = [username, email, address, city, country, postal_code, credit_card];

  if ((0, _utils.checkMissingParameter)([username])) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    const users = await (0, _db.query)(_queries.editUser, params);
    return (0, _utils.buildSuccessResponse)(res, {
      data: buildUsersObject(users[0])
    });
  } catch (err) {
    return (0, _utils.buildErrorObject)(res, {
      status: 400,
      error: err.message
    });
  }
}

/**************************
 * PRIVATE FUNCTIONS
 **************************/
function buildUsersObject(user) {
  const obj = {
    kind: "User",
    ...user,
    selfLink: `/users/${user.username}`
  };
  delete obj.password;
  return obj;
}
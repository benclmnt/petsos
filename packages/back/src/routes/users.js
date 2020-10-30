import express from "express";
import logger from "../logger";
import { query } from "../db";
import {
  getAllUsers,
  registerUser,
  queryUserByUsername,
  deleteUser as deleteUserQuery,
  editUser as editUserQuery,
  queryPastOrders,
  setRatingAndReview,
} from "../db/queries";

function getUsersRoutes() {
  const router = express.Router();
  router.post("/login", login);
  router.post("/register", register);
  router.get("/:username", getUserInfo);
  router.delete("/:username", deleteUser);
  router.patch("/:username", editUserDetails);
  router.get("", listAllUsers);
  router.get("/getPastOrders/:pouname", retrievePastOrders);
  router.post("/setRatingAndReview", putRatingAndReview);
  return router;
}

async function putRatingAndReview(req, res) {
  const { pouname, petname, start_date, end_date, rating, review } = req.body; // GG SQL INJECTION!
  const params = [pouname, petname, start_date, end_date, rating, review];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(setRatingAndReview, params);
  } catch (err) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: err.message,
    });
  }

  const users = await query(queryUserByUsername, [pouname]);
  return buildSuccessResponse(res, {
    user: buildUsersObject(users[0]),
  });
}

async function retrievePastOrders(req, res) {
  const pouname = req.params.pouname;

  console.log(pouname);

  if (checkMissingParameter([pouname])) {
    return handleMissingParameter(res);
  }

  const orders = await query(queryPastOrders, [pouname]);

  checkUserExists(res, orders);

  return buildSuccessResponse(res, {
    user: buildUsersObject(orders),
  });
}

/**
 * Register user using username, email, password
 */
async function register(req, res) {
  const { username, email, password } = req.body;
  const params = [username, email, password];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(registerUser, params);
  } catch (err) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: "Username already registered.",
    });
  }

  const users = await query(queryUserByUsername, [username]);
  return buildSuccessResponse(res, {
    user: buildUsersObject(users[0]),
  });
}

/**
<<<<<<< HEAD
 * Login using email
=======
 * Delete user account
 */
async function deleteUser(req, res) {
  const { username } = req.params;
  const params = [username];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(deleteUserQuery, [username]);
  return buildSuccessResponse(res, {
    user: "success",
  });
}

/**
 * Login using username
 */
async function login(req, res) {
  const { username, password } = req.body;

  if (checkMissingParameter([username, password])) {
    return handleMissingParameter(res);
  }

  const users = await query(queryUserByUsername, [username]);

  checkUserExists(res, users);

  if (password !== users[0].password) {
    return buildUsersErrorObject(res, {
      status: 401,
      error: "Wrong email or password",
    });
  }

  return buildSuccessResponse(res, {
    user: buildUsersObject(users[0]),
  });
}

async function getUserInfo(req, res) {
  const { username } = req.params; // GG SQL INJECTION!

  if (checkMissingParameter([username])) {
    return handleMissingParameter(res);
  }

  const users = await query(queryUserByUsername, [username]);

  checkUserExists(res, users);

  return buildSuccessResponse(res, {
    user: buildUsersObject(users[0]),
  });
}

async function listAllUsers(req, res) {
  const users = await query(getAllUsers);
  return buildSuccessResponse(res, {
    user: users.map(buildUsersObject),
  });
}

async function editUserDetails(req, res) {
  const { username } = req.params; // GG SQL INJECTION!
  const { email, address, city, country, postal_code } = req.body;
  const params = [username, email, address, city, country, postal_code];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    const users = await query(editUserQuery, params);
    console.log(users);
    return buildSuccessResponse(res, {
      user: buildUsersObject(users[0]),
    });
  } catch (err) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: err.message,
    });
  }
}

export { getUsersRoutes };

/**
 * PRIVATE FUNCTIONS
 */

function buildUsersErrorObject(res, { status, error }) {
  logger.error(error);

  const errorResp = {
    kind: "Error",
    error,
  };

  return res.status(status).json(errorResp);
}

function buildUsersObject(user) {
  const obj = {
    kind: "User",
    ...user,
    selfLink: `/users/${user.username}`,
  };
  delete obj.password;
  return obj;
}

function buildSuccessResponse(res, { status, user }) {
  console.log("returned: ", user);
  return res.status(status || 200).json(user);
}

function checkUserExists(res, users) {
  if (users.length === 0) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: "Cannot find user",
    });
  }
}

function checkMissingParameter(array) {
  return array.some((param) => param === undefined || param === null);
}

function handleMissingParameter(res) {
  return buildUsersErrorObject(res, {
    status: 400,
    error: "Missing some required parameters",
  });
}

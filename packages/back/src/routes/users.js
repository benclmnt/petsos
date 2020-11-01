import express from "express";
import { query } from "../db";
import { getUsersPetsRoutes } from "./pets";
import {
  getAllUsers,
  registerUser,
  queryUserByUsername,
  deleteUser as deleteUserQuery,
  editUser as editUserQuery,
} from "../db/queries";
import {
  buildErrorObject,
  buildSuccessResponse,
  checkMissingParameter,
  handleMissingParameter,
} from "./utils";

function getUsersRoutes() {
  const router = express.Router();
  router.post("/login", login);
  router.post("/register", register);
  router.use("/:username", getUsersPetsRoutes());
  router.get("/:username", getUserInfo);
  router.delete("/:username", deleteUser);
  router.patch("/:username", editUserDetails);
  router.get("", listAllUsers);
  return router;
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
    return buildErrorObject(res, {
      status: 400,
      error: "Username already registered.",
    });
  }

  const users = await query(queryUserByUsername, [username]);
  return buildSuccessResponse(res, {
    data: buildUsersObject(users[0]),
  });
}

/**
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
    data: "success",
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

  if (users.length === 0) {
    return buildErrorObject(res, {
      error: "Cannot find user",
    });
  }

  if (password !== users[0].password) {
    return buildErrorObject(res, {
      status: 401,
      error: "Wrong email or password",
    });
  }

  return buildSuccessResponse(res, {
    data: buildUsersObject(users[0]),
  });
}

async function getUserInfo(req, res) {
  const { username } = req.params; // GG SQL INJECTION!

  if (checkMissingParameter([username])) {
    return handleMissingParameter(res);
  }

  const users = await query(queryUserByUsername, [username]);

  if (users.length === 0) {
    return buildErrorObject(res, {
      error: "Cannot find user",
    });
  }

  return buildSuccessResponse(res, {
    data: buildUsersObject(users[0]),
  });
}

async function listAllUsers(req, res) {
  const users = await query(getAllUsers);
  return buildSuccessResponse(res, {
    data: users.map(buildUsersObject),
  });
}

async function editUserDetails(req, res) {
  const { username } = req.params; // GG SQL INJECTION!
  const { email, address, city, country, postal_code } = req.body;
  const params = [username, email, address, city, country, postal_code];

  if (checkMissingParameter([username])) {
    return handleMissingParameter(res);
  }

  try {
    const users = await query(editUserQuery, params);
    return buildSuccessResponse(res, {
      data: buildUsersObject(users[0]),
    });
  } catch (err) {
    return buildErrorObject(res, {
      status: 400,
      error: err.message,
    });
  }
}

export { getUsersRoutes };

/**************************
 * PRIVATE FUNCTIONS
 **************************/

function buildUsersObject(user) {
  const obj = {
    kind: "User",
    ...user,
    selfLink: `/users/${user.username}`,
  };
  delete obj.password;
  return obj;
}

import express from 'express';
import logger from '../logger';
import { query } from '../db';
import {
  getAllUsers,
  registerUser,
  queryUserByUsername,
  deleteUser as deleteUserQuery,
  upsertUserAddress as upsertUserAddressQuery,
  updateUser as updateUserByUsername,
  queryPetByName,
  addPet,
} from '../db/queries';

function getUsersRoutes() {
  const router = express.Router();
  router.post('/login', login);
  router.post('/register', register);
  router.post('/addNewPet', insertNewPetToTable);
  router.get('/:username', getUserInfo);
  router.delete('/:username', deleteUser);
  router.patch('/:username', editUserDetails);
  router.get('', listAllUsers);
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
    return buildUsersErrorObject(res, {
      status: 400,
      error: 'Username already registered.',
    });
  }

  const users = await query(queryUserByUsername, [username]);
  return buildSuccessResponse(res, {
    user: buildUsersObject(users[0]),
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
    user: 'success',
  });
}

/**
 * Insert new pet to table
 */
async function insertNewPetToTable(req, res) {
  const { name, pouname, species, breed, size } = req.body;
  const params = [name, pouname, species, breed, size];
  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(addPet, params);
  } catch (err) {
    console.log(err);
    return buildUsersErrorObject(res, {
      status: 400,
      error: 'Pet has already existed',
    });
  }

  // TODO: Drake to fix return data
  const user = await query('SELECT * FROM pets;');
  console.log(user);
  return buildSuccessResponse(res, {
    user,
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
      error: 'Wrong email or password',
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
  const possibleParams = [
    'email',
    'password',
    'address',
    'city',
    'country',
    'postal_code',
  ];

  if (checkMissingParameter([username])) {
    return handleMissingParameter(res);
  }

  let queryStmt = 'UPDATE users SET ';
  queryStmt += possibleParams
    .map((param) =>
      !!req.body[param] ? `${param} = '${req.body[param]}'` : ''
    )
    .filter((x) => x !== '')
    .join(', ');
  queryStmt += ` WHERE username = '${username}';`;

  try {
    await query(queryStmt);
  } catch (err) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: err.message,
    });
  }

  const users = await query(queryUserByUsername, [username]);

  return buildSuccessResponse(res, {
    user: buildUsersObject(users[0]),
  });
}

async function updateUser(req, res) {
  const {
    prev_username,
    username,
    email,
    addr,
    city,
    country,
    postal_code,
  } = req.body; // GG SQL INJECTION!
  const params = [
    prev_username,
    username,
    email,
    addr,
    city,
    country,
    postal_code,
  ];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(updateUserByUsername, params);

  const users = await query(queryUserByUsername, [username]);

  return buildSuccessResponse(res, {
    user: buildUsersObject(users[0]),
  });
}

export { getUsersRoutes };

/**
 * PRIVATE FUNCTIONS
 */

function buildUsersErrorObject(res, { status, error }) {
  logger.error(error);

  const errorResp = {
    kind: 'Error',
    error,
  };

  return res.status(status).json(errorResp);
}

function buildUsersObject(user) {
  const obj = {
    kind: 'User',
    ...user,
    selfLink: `/users/${user.username}`,
  };
  delete obj.password;
  return obj;
}

function buildSuccessResponse(res, { status, user }) {
  console.log('returned: ', user);
  return res.status(status || 200).json(user);
}

function checkUserExists(res, users) {
  if (users.length === 0) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: 'Cannot find user',
    });
  }
}

function checkMissingParameter(array) {
  return array.some((param) => param === undefined || param === null);
}

function handleMissingParameter(res) {
  return buildUsersErrorObject(res, {
    status: 400,
    error: 'Missing some required parameters',
  });
}

import express from 'express';
import logger from '../logger';
import { query } from '../db';
import {
  getAllUsers,
  registerUser,
  queryUserByUsername,
  queryUserByEmail,
  upsertUserAddress as upsertUserAddressQuery,
  queryPetByName,
  addPet,
} from '../db/queries';

function getUsersRoutes() {
  const router = express.Router();
  router.post('/login', login);
  router.post('/register', register);
  router.post('/addNewPet', insertNewPetToTable);
  router.get('/:username', getUserByUsername);
  router.post('/:username/address', upsertUserAddress);
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

  const user = await query(queryUserByEmail, [email]);
  return buildSuccessResponse(res, {
    user: buildUsersObject(user),
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
 * Login using email
 */
async function login(req, res) {
  const { email, password } = req.body;

  if (checkMissingParameter([email, password])) {
    return handleMissingParameter(res);
  }

  const users = await query(queryUserByEmail, [email]);

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

async function getUserByUsername(req, res) {
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
  let users = await query(getAllUsers);
  users = users.map(buildUsersObject);
  return buildSuccessResponse(res, {
    user: users,
  });
}

async function upsertUserAddress(req, res) {
  const { username, address, city, country, postal } = req.body; // GG SQL INJECTION!
  const params = [username, address, city, country, postal];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(upsertUserAddressQuery, params);

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
  console.log(user);
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

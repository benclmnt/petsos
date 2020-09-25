import express from 'express';
import logger from '../logger';
import { query } from '../db';
import {
  getAllUsers,
  registerUser,
  queryUserById,
  queryUserByEmail,
} from '../db/queries';

function getUsersRoutes() {
  const router = express.Router();
  router.post('/login', login);
  router.post('/register', register);
  router.get('/:userId', getUserById);
  router.get('', listAllUsers);
  return router;
}

async function register(req, res) {
  const { body } = req;
  const params = [body.name, body.email, body.password];

  try {
    await query(registerUser, params);
  } catch (err) {
    logger.error(err);
    return buildUsersErrorObject(res, {
      status: 400,
      error: 'Email already registered.',
    });
  }

  const user = await query(queryUserByEmail, [body.email]);
  return buildUsersSuccessObject(res, { user });
}

async function login(req, res) {
  const { body } = req;
  const users = await query(queryUserByEmail, [body.email]);

  checkUserExists(res, users);

  if (body.password !== users[0].password) {
    return buildUsersErrorObject(res, {
      status: 401,
      error: 'Wrong email or password',
    });
  }

  return buildUsersSuccessObject(res, { user: users[0] });
}

async function getUserById(req, res) {
  // TODO: parse the userId. Make sure it is number
  const users = await query(queryUserById, [req.params.userId]);

  checkUserExists(res, users);

  return buildUsersSuccessObject(res, {
    user: users[0],
  });
}

async function listAllUsers(req, res) {
  const users = await query(getAllUsers);
  return buildUsersSuccessObject(res, {
    user: users,
  });
}

export { getUsersRoutes };

/**
 * PRIVATE FUNCTIONS
 */

function buildUsersErrorObject(res, { status, error }) {
  const errorResp = {
    error,
  };

  return res.status(status).json(errorResp);
}

function buildUsersSuccessObject(res, { status, user }) {
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

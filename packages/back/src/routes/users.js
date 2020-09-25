import express from 'express';
import logger from '../logger';
import { query } from '../db';
import { getAllUsers, registerUser } from '../db/queries';

function getUsersRoutes() {
  const router = express.Router();
  router.get('/', listAllUsers);
  router.get('/:userId', getUserById);
  router.post('/login', login);
  router.post('/register', register);
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
      error: err,
    });
  }

  const user = await getUserInfo();
  return res.json(body);
}

async function login(req, res) {}

async function getUserById(req, res) {
  const user = await query(getUserInfo, params);
  return buildUsersSuccessObject(res, {
    user,
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

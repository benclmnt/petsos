import express from 'express';
import logger from '../logger';
import { query } from '../db';
import {
  addPet,
  queryPetByPouname,
  queryPetByPounameAndName,
  deletePetByPounameAndName,
} from '../db/queries';

function getUsersRoutesPets() {
  const router = express.Router();
  router.post('/addNewPet', insertNewPetToTable);
  router.get('/getPetByPouname/:pouname', getPetByPouname);
  router.get('/getPetByPounameAndName/:pouname/:name', getPetByPounameAndName);
  router.delete(
    '/deletePetByPounameAndName/:pouname/:name',
    removePetByPounameAndName
  );
  return router;
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

async function getPetByPouname(req, res) {
  const pouname = req.params.pouname.slice(1);
  const params = [pouname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  const users = await query(queryPetByPouname, params);

  checkUserExists(res, users);

  return buildSuccessResponse(res, {
    user: buildUsersObject(users),
  });
}

async function getPetByPounameAndName(req, res) {
  const pouname = req.params.pouname.slice(1);
  const name = req.params.name.slice(1);
  const params = [pouname, name];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  const users = await query(queryPetByPounameAndName, params);

  checkUserExists(res, users);

  return buildSuccessResponse(res, {
    user: buildUsersObject(users),
  });
}

async function removePetByPounameAndName(req, res) {
  const pouname = req.params.pouname.slice(1);
  const name = req.params.name.slice(1);
  const params = [pouname, name];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  const users = await query(deletePetByPounameAndName, params);

  checkUserExists(res, users);

  return buildSuccessResponse(res, {
    user: buildUsersObject(users),
  });
}

export { getUsersRoutesPets };

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
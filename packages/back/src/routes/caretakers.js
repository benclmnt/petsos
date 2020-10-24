import express from 'express';
import logger from '../logger';
import { query } from '../db';
import {
  getAllCaretakers,
  queryCaretakerByUsername,
  upsertCaretakerCapability as upsertCaretakerCapabilityQuery,
  upsertCaretakerAvailability as upsertCaretakerAvailabilityQuery,
  insertNewCaretaker as insertNewCaretakerQuery,
} from '../db/queries';

function getCaretakersRoutes() {
  const router = express.Router();
  router.post('/insert', insertNewCaretaker);
  router.post('/availability', upsertCaretakerAvailability);
  router.post('/capability', upsertCaretakerCapability);
  router.get('/caretakers', listAllCaretakers);
  return router;
}

async function insertNewCaretaker(req, res) {
  const { username, type } = req.body;
  const params = [username, type];
  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(insertNewCaretakerQuery, params);
  } catch (err) {
    return buildCaretakersErrorObject(res, {
      status: 400,
      error: 'Username does not exist.',
    });
  }

  const caretaker = await query(insertNewCaretakerQuery, params);
  return buildSuccessResponse(res, {
    caretaker: buildCaretakersObject(caretaker),
  });
}

async function getCaretakerByUsername(req, res) {
  const { username } = req.params; // GG SQL INJECTION!

  if (checkMissingParameter([username])) {
    return handleMissingParameter(res);
  }

  const caretakers = await query(queryCaretakerByUsername, [username]);

  checkCaretakerExists(res, caretakers);

  return buildSuccessResponse(res, {
    caretaker: buildCaretakersObject(caretakers[0]),
  });
}

async function upsertCaretakerCapability(req, res) {
  const { breed, size, species, username } = req.body;
  const params = [breed, size, species, username];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(upsertCaretakerCapabilityQuery, params);

  const caretakers = await query(queryCaretakerByUsername, [username]);

  return buildSuccessResponse(res, {
    caretaker: buildCaretakersObject(caretakers[0]),
  });
}

async function upsertCaretakerAvailability(req, res) {
  const { username, startDate, endDate } = req.body;
  const params = [username, startDate, endDate];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(upsertCaretakerAvailabilityQuery, params);

  const caretakers = await query(queryCaretakerByUsername, [username]);

  return buildSuccessResponse(res, {
    caretaker: buildCaretakersObject(caretakers[0]),
  });
}

async function listAllCaretakers(req, res) {
  let caretakers = await query(getAllCaretakers);
  caretakers = caretakers.map(buildCaretakersObject);
  return buildSuccessResponse(res, {
    caretaker: caretakers,
  });
}

export { getCaretakersRoutes };

/**
 * PRIVATE FUNCTIONS
 */

function buildCaretakersErrorObject(res, { status, error }) {
  logger.error(error);

  const errorResp = {
    kind: 'Error',
    error,
  };

  return res.status(status).json(errorResp);
}

function buildCaretakersObject(caretaker) {
  const obj = {
    kind: 'Caretaker',
    ...caretaker,
    selfLink: `/caretakers/${caretaker.username}`,
  };
  delete obj.password;
  return obj;
}

function buildSuccessResponse(res, { status, caretaker }) {
  return res.status(status || 200).json(caretaker);
}

function buildAvailabilityObject(availability) {
  const obj = {
    kind: 'Availability',
    ...availability,
    selfLink: `/availability/${caretakers.username}`,
  };
  return obj;
}

function checkCaretakerExists(res, caretakers) {
  if (caretakers.length === 0) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: 'Cannot find caretaker',
    });
  }
}

function checkMissingParameter(array) {
  return array.some((param) => param === undefined || param === null);
}

function handleMissingParameter(res) {
  return buildCaretakersErrorObject(res, {
    status: 400,
    error: 'Missing some required parameters',
  });
}

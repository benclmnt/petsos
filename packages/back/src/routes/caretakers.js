import express from 'express';
import logger from '../logger';
import { query } from '../db';
import {
  getAllCaretakers,
  queryCaretakerByUsername,
  upsertCaretakerCapability as upsertCaretakerCapabilityQuery,
  upsertCaretakerAvailabilityCapability as upsertCaretakerAvailabilityQuery,
  insertNewCaretaker as insertNewCaretakerQuery,
} from '../db/queries';

function getCaretakersRoutes() {
  const router = express.Router();
  router.post('/insert', insertNewCaretaker);
  router.post('/:ctuname/availabiity', upsertCaretakerAvailability);
  router.post('/:ctuname/capability', upsertCaretakerCapability);
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
  const { breed, size, petname, ctuname } = req.body;
  const params = [breed, size, petname, ctuname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(upsertCaretakerCapabilityQuery, params);

  const caretakers = await query(upsertCaretakerCapabilityQuery, [ctuname]);

  return buildSuccessResponse(res, {
    caretaker: buildUsersObject(caretakers[0]),
  });
}

async function upsertCaretakerAvailability(req, res) {
  const { ctuname, start_date, end_date } = req.body;
  const params = [ctuname, start_date, end_date];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(upsertCaretakerAddressQuery, params);

  const caretakers = await query(upsertCaretakerAvailabilityQuery, [ctuname]);

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

import express from "express";
import logger from "../logger";
import { query } from "../db";
import {
  queryAllCaretakers as getCaretakersQuery,
  queryAllReviews as reviewsQuery,
  queryCaretakerByUsername,
  getAllCapabilities,
  editCaretakerType as editCaretakerTypeQuery,
  querySearchCaretakers as searchCaretakersQuery,
  upsertCaretakerCapability as upsertCaretakerCapabilityQuery,
  upsertCaretakerAvailability as upsertCaretakerAvailabilityQuery,
  getCapability,
  getAvailability,
  deleteCapabilities as deleteCapabilitiesQuery,
  deleteAvailabilities as deleteAvailabilitiesQuery,
  insertNewCaretaker as insertNewCaretakerQuery,
} from "../db/queries";

function getCaretakersRoutes() {
  const router = express.Router();
  router.post("/availability", upsertCaretakerAvailability);
  router.post("/capability", upsertCaretakerCapability);
  router.get("/search", querySearchCaretakers);
  router.get("/reviews", getAllReviews);
  router.get("/searchct", querySearchCaretakers);
  router.get("/:ctuname", getCaretakerByUsername);
  router.patch("/:ctuname", editCaretakerType);
  router.get("/:ctuname/capabilities", getCaretakerCapability);
  router.get("/:ctuname/availabilities", getCaretakerAvailability);
  router.delete("/:ctuname/capabilities", deleteCapabilities);
  router.delete("/:ctuname/availabilities", deleteAvailabilities);
  router.post("/", insertNewCaretaker);
  router.get("/", getAllCaretakers);
  return router;
}

async function getAllReviews(req, res) {
  const { ctuname } = req.query;
  console.log("ctuname", ctuname);
  const reviews = await query(reviewsQuery, [ctuname]);
  console.log(reviews);
  return buildSuccessResponse(res, {
    caretaker: reviews,
  });
}

async function getAllCaretakers(req, res) {
  const caretakers = await query(getCaretakersQuery);
  return buildSuccessResponse(res, {
    caretaker: caretakers,
  });
}

// async function listAllCapabilities(req, res) {
//   const capabilities = await query(getAllCapabilities);
//   return buildSuccessResponse(res, {
//     caretaker: capabilities,
//   });
// }

async function querySearchCaretakers(req, res) {
  const { postal_code, start_date, end_date, species, breed, size } = req.query;
  // const { ctuname, base_price, avg_rating } = req.body;
  const params = [postal_code, start_date, end_date, species, breed, size];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  console.log(params);

  try {
    const caretakers = await query(searchCaretakersQuery, [
      start_date,
      end_date,
      species,
      breed,
    ]);
    console.log(caretakers);
    // caretakers = caretakers.map(buildCaretakersObject);
    return buildSuccessResponse(res, {
      caretaker: caretakers,
    });
  } catch (err) {
    console.log(err);
    return buildCaretakersErrorObject(res, {
      status: 200,
      error: err.detail,
    });
  }
}

async function insertNewCaretaker(req, res) {
  const { ctuname, ct_type } = req.body;
  const params = [ctuname, ct_type];
  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(insertNewCaretakerQuery, params);
    const caretakers = await query(queryCaretakerByUsername, [ctuname]);
    return buildSuccessResponse(res, {
      caretaker: buildCaretakersObject(caretakers[0]),
    });
  } catch (err) {
    return buildCaretakersErrorObject(res, {
      status: 200,
      error: err.detail,
    });
  }
}

async function getCaretakerByUsername(req, res) {
  const { ctuname } = req.params;

  if (checkMissingParameter([ctuname])) {
    return handleMissingParameter(res);
  }

  const caretakers = await query(queryCaretakerByUsername, [ctuname]);

  checkCaretakerExists(res, caretakers);

  return buildSuccessResponse(res, {
    caretaker: buildCaretakersObject(caretakers[0]),
  });
}

async function getCaretakerCapability(req, res) {
  const { ctuname } = req.params; // GG SQL INJECTION!

  if (checkMissingParameter([ctuname])) {
    return handleMissingParameter(res);
  }

  const capabilities = await query(getCapability, [ctuname]);
  console.log(capabilities);

  return buildSuccessResponse(res, {
    caretaker: capabilities,
  });
}

async function upsertCaretakerCapability(req, res) {
  const { pc_species, pc_breed, pc_size, ctuname } = req.body;
  const params = [pc_species, pc_breed, pc_size, ctuname];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(upsertCaretakerCapabilityQuery, params);
  } catch (err) {
    return buildCaretakersErrorObject(res, {
      status: 200,
      error: err.detail,
    });
  }

  const caretakers = await query(queryCaretakerByUsername, [ctuname]);

  return buildSuccessResponse(res, {
    caretaker: buildCaretakersObject(caretakers[0]),
  });
}

async function deleteCapabilities(req, res) {
  const { ctuname } = req.params;
  const params = [ctuname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(deleteCapabilitiesQuery, [ctuname]);
  return buildSuccessResponse(res, {
    caretaker: "success",
  });
}

async function getCaretakerAvailability(req, res) {
  const { ctuname } = req.params; // GG SQL INJECTION!

  if (checkMissingParameter([ctuname])) {
    return handleMissingParameter(res);
  }

  const availabilities = await query(getAvailability, [ctuname]);
  console.log(availabilities);

  return buildSuccessResponse(res, {
    caretaker: availabilities,
  });
}

async function upsertCaretakerAvailability(req, res) {
  const { ctuname, start_date, end_date } = req.body;
  const params = [ctuname, start_date, end_date];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(upsertCaretakerAvailabilityQuery, params);
  } catch (err) {
    return buildCaretakersErrorObject(res, {
      status: 200,
      error: err.detail,
    });
  }

  const caretakers = await query(queryCaretakerByUsername, [ctuname]);

  return buildSuccessResponse(res, {
    caretaker: buildCaretakersObject(caretakers[0]),
  });
}

async function deleteAvailabilities(req, res) {
  const { ctuname } = req.params;
  const params = [ctuname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(deleteAvailabilitiesQuery, [ctuname]);
  return buildSuccessResponse(res, {
    caretaker: "success",
  });
}

async function editCaretakerType(req, res) {
  const { ctuname } = req.params; // GG SQL INJECTION!
  const { ct_type } = req.body;
  const params = [ctuname, ct_type];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    const caretakers = await query(editCaretakerTypeQuery, params);
    console.log(caretakers);
    return buildSuccessResponse(res, {
      caretaker: buildCaretakersObject(caretakers[0]),
    });
  } catch (err) {
    return buildCaretakersErrorObject(res, {
      status: 400,
      error: err.message,
    });
  }
}

export { getCaretakersRoutes };

/**
 * PRIVATE FUNCTIONS
 */

function buildCaretakersErrorObject(res, { status, error }) {
  logger.error(error);

  const errorResp = {
    kind: "Error",
    error,
  };

  return res.status(status).json(errorResp);
}

function buildCaretakersObject(caretaker) {
  const obj = {
    kind: "Caretaker",
    ...caretaker,
    selfLink: `/caretakers/${caretaker.ctuname}`,
  };
  return obj;
}

function buildSuccessResponse(res, { status, caretaker }) {
  return res.status(status || 200).json(caretaker);
}

function checkCaretakerExists(res, caretakers) {
  if (caretakers.length === 0) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: "Cannot find caretaker",
    });
  }
}

function checkMissingParameter(array) {
  return array.some((param) => param === undefined || param === null);
}

function handleMissingParameter(res) {
  return buildCaretakersErrorObject(res, {
    status: 400,
    error: "Missing some required parameters",
  });
}

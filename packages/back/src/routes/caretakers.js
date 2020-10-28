import express from "express";
import logger from "../logger";
import { query } from "../db";
import {
  queryAllCaretakers as getCaretakersQuery,
  queryCaretakerByUsername,
  getAllCapabilities,
  querySearchCaretakers as searchCaretakersQuery,
  getPetCategories,
  upsertCaretakerCapability as upsertCaretakerCapabilityQuery,
  upsertCaretakerAvailability as upsertCaretakerAvailabilityQuery,
  insertNewCaretaker as insertNewCaretakerQuery,
} from "../db/queries";

function getCaretakersRoutes() {
  const router = express.Router();
  router.post("/availability", upsertCaretakerAvailability);
  router.post("/capability", upsertCaretakerCapability);
  router.get("/categories", listAllPetCategories);
  router.get("/ctresults", getAllCaretakers);
  router.get("/searchct", querySearchCaretakers);
  router.get("/ctcapability", listAllCapabilities);
  router.get("/:username", getCaretakerByUsername);
  router.post("/", insertNewCaretaker);
  //router.get('/', listAllCaretakers);
  return router;
}

async function getAllCaretakers(req, res) {
  const caretakers = await query(getCaretakersQuery);
  return buildSuccessResponse(res, {
    caretaker: caretakers,
  });
}

async function listAllCapabilities(req, res) {
  const capabilities = await query(getAllCapabilities);
  return buildSuccessResponse(res, {
    caretaker: capabilities,
  });
}

async function listAllPetCategories(req, res) {
  const categories = await query(getPetCategories);
  //console.log(categories);

  const data = {};
  for (let category of categories) {
    if (!data[category.species]) {
      data[category.species] = [];
    }

    if (!data[category.species].includes(category.breed)) {
      data[category.species].push(category.breed);
    }
  }
  console.log(data);

  // const a = [];
  return buildSuccessResponse(res, {
    caretaker: data,
  });
}

async function querySearchCaretakers(req, res) {
  const {
    postal_code,
    start_date,
    end_date,
    species,
    breed,
    size,
  } = req.params;
  // const { ctuname, base_price, avg_rating } = req.body;
  const params = [postal_code, start_date, end_date, species, breed, size];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    const caretakers = await query(searchCaretakersQuery, params);
    console.log(caretakers);
    // caretakers = caretakers.map(buildCaretakersObject);
    return buildSuccessResponse(res, {
      caretaker: caretakers.map(buildCaretakersObject),
    });
  } catch (err) {
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

// async function listAllCaretakers(req, res) {
//   let caretakers = await query(getAllCaretakers);
//   caretakers = caretakers.map(buildCaretakersObject);
//   return buildSuccessResponse(res, {
//     caretaker: caretakers,
//   });
// }

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
    selfLink: `/caretakers/${caretaker.username}`,
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

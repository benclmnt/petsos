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
  allCaretakerInsightQuery as getPayoutQuery,
} from "../db/queries";
import {
  buildErrorObject,
  buildSuccessResponse,
  checkMissingParameter,
  handleMissingParameter,
} from "./utils";

function getCaretakersRoutes() {
  const router = express.Router();
  router.post("/availability", upsertCaretakerAvailability);
  router.post("/capability", upsertCaretakerCapability);
  router.get("/reviews", getAllReviewsByUser);
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

async function getAllReviewsByUser(req, res) {
  const { ctuname } = req.query;
  const reviews = await query(reviewsQuery, [ctuname, 10]);
  console.log(reviews);
  return buildSuccessResponse(res, {
    data: reviews,
  });
}

async function getAllCaretakers(req, res) {
  const caretakers = await query(getCaretakersQuery);
  return buildSuccessResponse(res, {
    data: caretakers,
  });
}

// async function listAllCapabilities(req, res) {
//   const capabilities = await query(getAllCapabilities);
//   return buildSuccessResponse(res, {
//     data: capabilities,
//   });
// }

async function querySearchCaretakers(req, res) {
  const { postal_code, start_date, end_date, species, breed } = req.query;
  // const { ctuname, base_price, avg_rating } = req.body;
  const params = [postal_code, start_date, end_date, species, breed];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

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
      data: caretakers,
    });
  } catch (err) {
    console.log(err);
    return buildErrorObject(res, {
      status: 200,
      error: err.detail,
    });
  }
}

async function insertNewCaretaker(req, res) {
  const { ctuname, ct_type } = req.body;
  const params = [ctuname, ct_type];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(insertNewCaretakerQuery, params);
    const caretakers = await query(queryCaretakerByUsername, [ctuname]);
    return buildSuccessResponse(res, {
      data: buildCaretakersObject(caretakers[0]),
    });
  } catch (err) {
    return buildErrorObject(res, {
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

  const insight = await query(
    getPayoutQuery +
      ", start_date, end_date HAVING ctuname = $1 AND end_date <= date('now') AND start_date >= date('now') - interval '1 month';",
    [ctuname]
  );
  const pastReviews = await query(reviewsQuery, [ctuname, 5]); // only past 5 reviews are shown

  return buildSuccessResponse(res, {
    data: {
      ...buildCaretakersObject(caretakers[0]),
      past_month: {
        total_payout: Number(insight[0]?.total_payout) || 0,
        pet_days: Number(insight[0]?.pet_days) || 0,
        num_jobs: Number(insight[0]?.num_jobs) || 0,
      },
      reviews: pastReviews,
    },
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
    data: capabilities,
  });
}

async function upsertCaretakerCapability(req, res) {
  const { pc_species, pc_breed, pc_size, ctuname } = req.body;
  const params = [pc_species, pc_breed, pc_size, ctuname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(upsertCaretakerCapabilityQuery, params);
  } catch (err) {
    return buildErrorObject(res, {
      status: 200,
      error: err.detail,
    });
  }

  const caretakers = await query(queryCaretakerByUsername, [ctuname]);

  return buildSuccessResponse(res, {
    data: buildCaretakersObject(caretakers[0]),
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
    data: "success",
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
    data: availabilities,
  });
}

async function upsertCaretakerAvailability(req, res) {
  const { ctuname, start_date, end_date } = req.body;
  const params = [ctuname, start_date, end_date];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(upsertCaretakerAvailabilityQuery, params);
  } catch (err) {
    return buildErrorObject(res, {
      status: 200,
      error: err.detail,
    });
  }

  const caretakers = await query(queryCaretakerByUsername, [ctuname]);

  return buildSuccessResponse(res, {
    data: buildCaretakersObject(caretakers[0]),
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
    data: "success",
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
      data: buildCaretakersObject(caretakers[0]),
    });
  } catch (err) {
    return buildErrorObject(res, {
      status: 400,
      error: err.message,
    });
  }
}

export { getCaretakersRoutes };

/**
 * PRIVATE FUNCTIONS
 */

function buildCaretakersObject(caretaker) {
  const obj = {
    kind: "Caretaker",
    ...caretaker,
    selfLink: `/caretakers/${caretaker.ctuname}`,
  };
  return obj;
}

function checkCaretakerExists(res, caretakers) {
  if (caretakers.length === 0) {
    return buildErrorObject(res, {
      status: 400,
      error: "Cannot find caretaker",
    });
  }
}

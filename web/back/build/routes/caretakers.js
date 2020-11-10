"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCaretakersRoutes = getCaretakersRoutes;

var _express = _interopRequireDefault(require("express"));

var _db = require("../db");

var _queries = require("../db/queries");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getCaretakersRoutes() {
  const router = _express.default.Router();

  router.post("/availability", upsertCaretakerAvailability);
  router.post("/capability", upsertCaretakerCapability);
  router.get("/reviews", getAllReviewsByUser);
  router.get("/searchct", searchCaretakers);
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
  const {
    ctuname
  } = req.query;
  const reviews = await (0, _db.query)(_queries.queryAllReviews, [ctuname, 10]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: reviews
  });
}

async function getAllCaretakers(req, res) {
  const caretakers = await (0, _db.query)(_queries.queryAllCaretakers);
  return (0, _utils.buildSuccessResponse)(res, {
    data: caretakers
  });
} // async function listAllCapabilities(req, res) {
//   const capabilities = await query(getAllCapabilities);
//   return buildSuccessResponse(res, {
//     data: capabilities,
//   });
// }


async function searchCaretakers(req, res) {
  const {
    postal_code,
    start_date,
    end_date,
    species,
    breed,
    size
  } = req.query; // const { ctuname, base_price, avg_rating } = req.body;

  const params = [postal_code, start_date, end_date, species, breed, size];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    const caretakers = await (0, _db.query)(_queries.querySearchCaretakers, [start_date, end_date, species, breed, size]);
    console.log(caretakers); // caretakers = caretakers.map(buildCaretakersObject);

    return (0, _utils.buildSuccessResponse)(res, {
      data: caretakers
    });
  } catch (err) {
    console.log(err);
    return (0, _utils.buildErrorObject)(res, {
      status: 200,
      error: err.detail
    });
  }
}

async function insertNewCaretaker(req, res) {
  const {
    ctuname,
    ct_type
  } = req.body;
  const params = [ctuname, ct_type];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    await (0, _db.query)(_queries.insertNewCaretaker, params);
    const caretakers = await (0, _db.query)(_queries.queryCaretakerByUsername, [ctuname]);
    return (0, _utils.buildSuccessResponse)(res, {
      data: buildCaretakersObject(caretakers[0])
    });
  } catch (err) {
    return (0, _utils.buildErrorObject)(res, {
      status: 200,
      error: err.detail
    });
  }
}

async function getCaretakerByUsername(req, res) {
  var _insight$, _insight$2, _insight$3;

  const {
    ctuname
  } = req.params;

  if ((0, _utils.checkMissingParameter)([ctuname])) {
    return (0, _utils.handleMissingParameter)(res);
  }

  const caretakers = await (0, _db.query)(_queries.queryCaretakerByUsername, [ctuname]);
  const insight = await (0, _db.query)(_queries.getPayout, [ctuname]);
  const pastReviews = await (0, _db.query)(_queries.queryAllReviews, [ctuname, 5]); // only past 5 reviews are shown

  return (0, _utils.buildSuccessResponse)(res, {
    data: { ...buildCaretakersObject(caretakers[0]),
      past_month: {
        total_payout: Number((_insight$ = insight[0]) === null || _insight$ === void 0 ? void 0 : _insight$.total_payout) || 0,
        pet_days: Number((_insight$2 = insight[0]) === null || _insight$2 === void 0 ? void 0 : _insight$2.pet_days) || 0,
        num_jobs: Number((_insight$3 = insight[0]) === null || _insight$3 === void 0 ? void 0 : _insight$3.num_jobs) || 0
      },
      reviews: pastReviews
    }
  });
}

async function getCaretakerCapability(req, res) {
  const {
    ctuname
  } = req.params; // GG SQL INJECTION!

  if ((0, _utils.checkMissingParameter)([ctuname])) {
    return (0, _utils.handleMissingParameter)(res);
  }

  const capabilities = await (0, _db.query)(_queries.getCapability, [ctuname]);
  console.log(capabilities);
  return (0, _utils.buildSuccessResponse)(res, {
    data: capabilities
  });
}

async function upsertCaretakerCapability(req, res) {
  const {
    pc_species,
    pc_breed,
    pc_size,
    ctuname
  } = req.body;
  const params = [pc_species, pc_breed, pc_size, ctuname];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    await (0, _db.query)(_queries.upsertCaretakerCapability, params);
  } catch (err) {
    throw err; // return buildErrorObject(res, {
    //   status: 200,
    //   error: err.detail,
    // });
  }

  const caretakers = await (0, _db.query)(_queries.queryCaretakerByUsername, [ctuname]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: buildCaretakersObject(caretakers[0])
  });
}

async function deleteCapabilities(req, res) {
  const {
    ctuname
  } = req.params;
  const params = [ctuname];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  await (0, _db.query)(_queries.deleteCapabilities, [ctuname]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: "success"
  });
}

async function getCaretakerAvailability(req, res) {
  const {
    ctuname
  } = req.params; // GG SQL INJECTION!

  if ((0, _utils.checkMissingParameter)([ctuname])) {
    return (0, _utils.handleMissingParameter)(res);
  }

  const availabilities = await (0, _db.query)(_queries.getAvailability, [ctuname]);
  console.log(availabilities);
  return (0, _utils.buildSuccessResponse)(res, {
    data: availabilities
  });
}

async function upsertCaretakerAvailability(req, res) {
  const {
    ctuname,
    start_date,
    end_date
  } = req.body;
  const params = [ctuname, start_date, end_date];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    await (0, _db.query)(_queries.upsertCaretakerAvailability, params);
  } catch (err) {
    throw err; // return buildErrorObject(res, {
    //   status: 200,
    //   error: err.detail,
    // });
  }

  const caretakers = await (0, _db.query)(_queries.queryCaretakerByUsername, [ctuname]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: buildCaretakersObject(caretakers[0])
  });
}

async function deleteAvailabilities(req, res) {
  const {
    ctuname
  } = req.params;
  const params = [ctuname];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  await (0, _db.query)(_queries.deleteAvailabilities, [ctuname]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: "success"
  });
}

async function editCaretakerType(req, res) {
  const {
    ctuname
  } = req.params; // GG SQL INJECTION!

  const {
    ct_type
  } = req.body;
  const params = [ctuname, ct_type];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    const caretakers = await (0, _db.query)(_queries.editCaretakerType, params);
    console.log(caretakers);
    return (0, _utils.buildSuccessResponse)(res, {
      data: buildCaretakersObject(caretakers[0])
    });
  } catch (err) {
    return (0, _utils.buildErrorObject)(res, {
      status: 400,
      error: err.message
    });
  }
}

/**
 * PRIVATE FUNCTIONS
 */
function buildCaretakersObject(caretaker) {
  const obj = {
    kind: "Caretaker",
    ...caretaker,
    selfLink: `/caretakers/${caretaker === null || caretaker === void 0 ? void 0 : caretaker.ctuname}`
  };
  return obj;
}
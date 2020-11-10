"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getJobsRoutes = getJobsRoutes;

var _express = _interopRequireDefault(require("express"));

var _logger = _interopRequireDefault(require("../logger"));

var _db = require("../db");

var _queries = require("../db/queries");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getJobsRoutes() {
  const router = _express.default.Router();

  router.post("/queryOverlap", getOverlap);
  router.post("/addBid", createBid);
  router.post("/winBid", winBidQuery);
  router.post("/getBids", getActiveBids);
  router.post("/removeBid", deleteBid);
  router.post("/getUpcomingJobs", getUpcomingJobsQuery);
  router.post("/unwinBid", unwinBidQuery);
  router.post("/updateRating", updateRatingQuery);
  return router;
}

async function getOverlap(req, res) {
  const {
    ctuname,
    start_date,
    end_date
  } = req.body;
  const params = [ctuname, start_date, end_date];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  const overlaps = await (0, _db.query)(_queries.queryOverlap, params);
  console.log(overlaps);
  return (0, _utils.buildSuccessResponse)(res, {
    data: overlaps
  });
}

async function createBid(req, res) {
  const {
    price,
    payment_method,
    transfer_method,
    start_date,
    end_date,
    ctuname,
    pouname,
    petname
  } = req.body;
  const params = [price, payment_method, transfer_method, start_date, end_date, ctuname, pouname, petname];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    console.log(params);
    const bids = await (0, _db.query)(_queries.addBid, params);

    if (bids.length === 0) {
      throw "conflict in bid - pet already being looked after at this time.";
    }
  } catch (err) {
    return (0, _utils.buildErrorObject)(res, {
      status: 400,
      error: "Unable to add bid."
    });
  } // let getBidParams = [params[6], params[7], params[3], params[4], params[5]];
  // const bids = await query(getBid, getBidParams);


  return (0, _utils.buildSuccessResponse)(res, {
    data: {
      status: 200
    }
  });
}

async function winBidQuery(req, res) {
  const {
    pouname,
    petname,
    start_date,
    end_date,
    ctuname
  } = req.body;
  const params = [pouname, petname, start_date, end_date, ctuname];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    const bids = await (0, _db.query)(_queries.winBid, params);

    if (bids.length === 0) {
      throw "conflict in winning bid - pet already being looked after at this time.";
    }

    return (0, _utils.buildSuccessResponse)(res, {
      data: buildBidObject(bids[0])
    });
  } catch (err) {
    return (0, _utils.buildErrorObject)(res, {
      status: 400,
      error: "Unable to win bid."
    });
  }
}

async function getActiveBids(req, res) {
  const {
    ctuname
  } = req.body;
  const params = [ctuname];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    const bids = await (0, _db.query)(_queries.getActiveBidsForCt, params);
    return (0, _utils.buildSuccessResponse)(res, {
      data: bids.map(buildBidObject)
    });
  } catch (err) {
    return (0, _utils.buildErrorObject)(res, {
      status: 400,
      error: "Unable to fetch bids."
    });
  }
}

async function deleteBid(req, res) {
  const {
    ctuname,
    start_date,
    end_date,
    pouname,
    petname
  } = req.body;
  const params = [ctuname, start_date, end_date, pouname, petname];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  await (0, _db.query)(_queries.removeBid, params);
  return (0, _utils.buildSuccessResponse)(res, {
    data: {
      status: 200
    }
  });
}

async function getUpcomingJobsQuery(req, res) {
  const {
    ctuname
  } = req.body;
  const params = [ctuname];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    const bids = await (0, _db.query)(_queries.getUpcomingJobs, params);
    return (0, _utils.buildSuccessResponse)(res, {
      data: bids.map(buildBidObject)
    });
  } catch (err) {
    return (0, _utils.buildErrorObject)(res, {
      status: 400,
      error: "Unable to fetch bids."
    });
  }
} // LOW PRIORITY TODO: handle returned row from query.


async function unwinBidQuery(req, res) {
  const {
    ctuname,
    start_date,
    end_date,
    pouname,
    petname
  } = req.body;
  const params = [pouname, petname, start_date, end_date, ctuname];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  await (0, _db.query)(_queries.unwinBid, params);
  return (0, _utils.buildSuccessResponse)(res, {
    data: {
      status: 200
    }
  });
}

async function updateRatingQuery(req, res) {
  const {
    pouname,
    petname,
    start_date,
    end_date,
    ctuname,
    rating
  } = req.body;
  const params = [pouname, petname, start_date, end_date, ctuname, rating];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    const bids = await (0, _db.query)(_queries.updateRating, params);
    console.log(bids);
    return (0, _utils.buildSuccessResponse)(res, {
      data: buildBidObject(bids[0])
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

/*function buildOverlapObject(job) {
  const obj = {
    kind: "Overlap",
    ...job,
  };
  return obj;
}*/
function buildBidObject(bid) {
  const obj = {
    kind: "Bid",
    ...bid
  };
  return obj;
}
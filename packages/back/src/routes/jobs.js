import express from "express";
import logger from "../logger";
import { query } from "../db";
import {
  queryOverlap,
  addBid,
  winBid,
  getActiveBidsForCt,
  removeBid,
  getUpcomingJobs,
  unwinBid,
  updateRating,
} from "../db/queries";
import {
  buildErrorObject,
  buildSuccessResponse,
  checkMissingParameter,
  handleMissingParameter,
} from "./utils";

function getJobsRoutes() {
  const router = express.Router();
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
  const { ctuname, start_date, end_date } = req.body;
  const params = [ctuname, start_date, end_date];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  const overlaps = await query(queryOverlap, params);
  console.log(overlaps);

  return buildSuccessResponse(res, {
    data: overlaps,
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
    petname,
  } = req.body;
  const params = [
    price,
    payment_method,
    transfer_method,
    start_date,
    end_date,
    ctuname,
    pouname,
    petname,
  ];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    console.log(params);
    const bids = await query(addBid, params);
    if (bids.length === 0) {
      throw "conflict in bid - pet already being looked after at this time.";
    }
  } catch (err) {
    return buildErrorObject(res, {
      status: 400,
      error: "Unable to add bid.",
    });
  }

  // let getBidParams = [params[6], params[7], params[3], params[4], params[5]];
  // const bids = await query(getBid, getBidParams);
  return buildSuccessResponse(res, {
    data: { status: 200 },
  });
}

async function winBidQuery(req, res) {
  const { pouname, petname, start_date, end_date, ctuname } = req.body;
  const params = [pouname, petname, start_date, end_date, ctuname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    const bids = await query(winBid, params);
    if (bids.length === 0) {
      throw "conflict in winning bid - pet already being looked after at this time.";
    }
    return buildSuccessResponse(res, {
      data: buildBidObject(bids[0]),
    });
  } catch (err) {
    return buildErrorObject(res, {
      status: 400,
      error: "Unable to win bid.",
    });
  }
}

async function getActiveBids(req, res) {
  const { ctuname } = req.body;
  const params = [ctuname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    const bids = await query(getActiveBidsForCt, params);
    return buildSuccessResponse(res, {
      data: bids.map(buildBidObject),
    });
  } catch (err) {
    return buildErrorObject(res, {
      status: 400,
      error: "Unable to fetch bids.",
    });
  }
}

async function deleteBid(req, res) {
  const { ctuname, start_date, end_date, pouname, petname } = req.body;
  const params = [ctuname, start_date, end_date, pouname, petname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(removeBid, params);
  return buildSuccessResponse(res, {
    data: { status: 200 },
  });
}
async function getUpcomingJobsQuery(req, res) {
  const { ctuname } = req.body;
  const params = [ctuname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    const bids = await query(getUpcomingJobs, params);
    return buildSuccessResponse(res, {
      data: bids.map(buildBidObject),
    });
  } catch (err) {
    return buildErrorObject(res, {
      status: 400,
      error: "Unable to fetch bids.",
    });
  }
}

// LOW PRIORITY TODO: handle returned row from query.
async function unwinBidQuery(req, res) {
  const { ctuname, start_date, end_date, pouname, petname } = req.body;
  const params = [pouname, petname, start_date, end_date, ctuname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  await query(unwinBid, params);
  return buildSuccessResponse(res, {
    data: { status: 200 },
  });
}

async function updateRatingQuery(req, res) {
  const { pouname, petname, start_date, end_date, ctuname, rating } = req.body;
  const params = [pouname, petname, start_date, end_date, ctuname, rating];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    const bids = await query(updateRating, params);
    console.log(bids);
    return buildSuccessResponse(res, {
      data: buildBidObject(bids[0]),
    });
  } catch (err) {
    return buildErrorObject(res, {
      status: 400,
      error: err.message,
    });
  }
}

export { getJobsRoutes };

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
    ...bid,
  };
  return obj;
}

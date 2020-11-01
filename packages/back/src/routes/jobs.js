import express from "express";
import logger from "../logger";
import { query } from "../db";
import {
  queryOverlap,
  addBid,
  winBid,
  getBid,
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
  router.post("/queryOverlap", queryOverlap);
  router.post("/addBid", createBid);
  router.post("/winBid", winBidQuery);
  router.post("/updateRating", updateRatingQuery);
  return router;
}

async function getOverlap(req, res) {
  const { ctuname, start_date, end_date } = req.body;
  const params = [ctuname, start_date, end_date];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  const overlaps = await query(queryOverlap);
  return buildSuccessResponse(res, {
    overlap: overlaps.map(buildOverlapObject),
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
    return handleMissingParmater(res);
  }

  try {
    await query(addBid, params);
  } catch (err) {
    return buildErrorObject(res, {
      status: 400,
      error: "Unable to add bid.",
    });
  }

  getBidParams = [params[6], params[7], params[3], params[4], params[5]];
  const bids = await query(getBid, getBidParams);
  return buildSuccessResponse(res, {
    data: buildBidObject(bids[0]),
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

function buildOverlapObject(job) {
  const obj = {
    kind: "Overlap",
    ...job,
  };
  return obj;
}

function buildBidObject(bid) {
  const obj = {
    kind: "Bid",
    ...bid,
  };
  return obj;
}

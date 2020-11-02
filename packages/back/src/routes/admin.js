import express from "express";
import logger from "../logger";
import { query } from "../db";
import {
  petsTakenCareOf,
  petsCareFrequency,
  allCaretakerInsightQuery,
} from "../db/queries";
import {
  buildErrorObject,
  buildSuccessResponse,
  checkMissingParameter,
  handleMissingParameter,
} from "./utils";

export function getAdminRoutes() {
  const router = express.Router();
  router.get("/stats", getBusinessStats);
  return router;
}

async function getBusinessStats(req, res) {
  const numOfCaredPetsInPast90Days = query(petsTakenCareOf);
  const numOfUsers = query("SELECT COUNT(*) FROM users;");
  const numOfCt = query("SELECT COUNT(*) FROM caretakers GROUP BY ct_type;");
  const topDealMakerPast90Days = query(petsCareFrequency);
  const tmp2 = query(allCaretakerInsightQuery);
  let result = await Promise.all([
    numOfCaredPetsInPast90Days,
    numOfUsers,
    numOfCt,
    topDealMakerPast90Days,
    tmp2,
  ]);
  return buildSuccessResponse(res, {
    data: {
      totalCaredPetsPast90Days: result[0][0].count,
      totalUsers: {
        users: result[1][0].count,
        ct: result[2][0].count,
      },
      tmp1: result[3],
      tmp2: result[4],
    },
  });
}

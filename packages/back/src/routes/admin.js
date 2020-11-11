import express from "express";
import logger from "../logger";
import { query } from "../db";
import {
  petsTakenCareOf,
  petsCareFrequency,
  allCaretakerInsightQuery,
  getProfit,
} from "../db/queries";
import { buildSuccessResponse } from "./utils";

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
  const tmp1 = query(getProfit);
  const caretakerInsight = query(
    allCaretakerInsightQuery +
      " ORDER BY pet_days DESC, num_jobs DESC, raw_payout DESC LIMIT 25;"
  );
  let result = await Promise.all([
    numOfCaredPetsInPast90Days,
    numOfUsers,
    numOfCt,
    topDealMakerPast90Days,
    tmp1,
    caretakerInsight,
  ]);

  return buildSuccessResponse(res, {
    data: {
      totalCaredPetsPast90Days: result[0][0]?.count,
      users: result[1][0]?.count,
      fulltime_ct: result[2][0]?.count,
      parttime_ct: result[2][1]?.count,
      topDealMakerPast90Days: result[3],
      ...result[4][0],
      caretakerInsight: result[5],
    },
  });
}

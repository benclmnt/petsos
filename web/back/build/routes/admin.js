"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAdminRoutes = getAdminRoutes;

var _express = _interopRequireDefault(require("express"));

var _logger = _interopRequireDefault(require("../logger"));

var _db = require("../db");

var _queries = require("../db/queries");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getAdminRoutes() {
  const router = _express.default.Router();

  router.get("/stats", getBusinessStats);
  return router;
}

async function getBusinessStats(req, res) {
  const numOfCaredPetsInPast90Days = (0, _db.query)(_queries.petsTakenCareOf);
  const numOfUsers = (0, _db.query)("SELECT COUNT(*) FROM users;");
  const numOfCt = (0, _db.query)("SELECT COUNT(*) FROM caretakers GROUP BY ct_type;");
  const topDealMakerPast90Days = (0, _db.query)(_queries.petsCareFrequency);
  const tmp1 = (0, _db.query)(_queries.getProfit);
  const caretakerInsight = (0, _db.query)(_queries.allCaretakerInsightQuery);
  let result = await Promise.all([numOfCaredPetsInPast90Days, numOfUsers, numOfCt, topDealMakerPast90Days, tmp1, caretakerInsight]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: {
      totalCaredPetsPast90Days: result[0][0].count,
      users: result[1][0].count,
      fulltime_ct: result[2][0].count,
      parttime_ct: result[2][1].count,
      topDealMakerPast90Days: result[3],
      ...result[4][0],
      caretakerInsight: result[5]
    }
  });
}
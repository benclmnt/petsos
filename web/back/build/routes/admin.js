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
  var _result$0$, _result$1$, _result$2$find, _result$2$find2;

  const numOfCaredPetsInPast90Days = (0, _db.query)(_queries.petsTakenCareOf);
  const numOfUsers = (0, _db.query)("SELECT COUNT(*) FROM users;");
  const numOfCt = (0, _db.query)("SELECT ct_type, COUNT(*) FROM caretakers GROUP BY ct_type;");
  const topDealMakerPast90Days = (0, _db.query)(_queries.petsCareFrequency);
  const tmp1 = (0, _db.query)(_queries.getProfit);
  const caretakerInsight = (0, _db.query)(_queries.allCaretakerInsightQuery + " ORDER BY pet_days DESC, num_jobs DESC, raw_payout DESC LIMIT 25;");
  let result = await Promise.all([numOfCaredPetsInPast90Days, numOfUsers, numOfCt, topDealMakerPast90Days, tmp1, caretakerInsight]);
  console.log(result[2].find(x => x.ct_type === "full-time"));
  return (0, _utils.buildSuccessResponse)(res, {
    data: {
      totalCaredPetsPast90Days: (_result$0$ = result[0][0]) === null || _result$0$ === void 0 ? void 0 : _result$0$.count,
      users: (_result$1$ = result[1][0]) === null || _result$1$ === void 0 ? void 0 : _result$1$.count,
      fulltime_ct: (_result$2$find = result[2].find(x => x.ct_type === "full-time")) === null || _result$2$find === void 0 ? void 0 : _result$2$find.count,
      parttime_ct: (_result$2$find2 = result[2].find(x => x.ct_type === "part-time")) === null || _result$2$find2 === void 0 ? void 0 : _result$2$find2.count,
      topDealMakerPast90Days: result[3],
      ...result[4][0],
      caretakerInsight: result[5]
    }
  });
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoutes = getRoutes;

var _express = _interopRequireDefault(require("express"));

var _users = require("./users");

var _pets = require("./pets");

var _caretakers = require("./caretakers");

var _admin = require("./admin");

var _jobs = require("./jobs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRoutes() {
  const router = _express.default.Router(); // router.use((req, res, next) => {
  //   res.requestedUrl = req.originalUrl;
  //   next();
  // });


  router.use("/pets", (0, _pets.getPetCategoriesRoutes)());
  router.use("/users", (0, _users.getUsersRoutes)());
  router.use("/caretakers", (0, _caretakers.getCaretakersRoutes)());
  router.use("/admin", (0, _admin.getAdminRoutes)());
  router.use("/jobs", (0, _jobs.getJobsRoutes)());
  return router;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRoutes = getRoutes;

var _express = _interopRequireDefault(require("express"));

var _users = require("./users");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRoutes() {
  const router = _express.default.Router(); // router.use((req, res, next) => {
  //   res.requestedUrl = req.originalUrl;
  //   next();
  // });


  router.use('/users', (0, _users.getUsersRoutes)());
  return router;
}
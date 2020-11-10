"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildErrorObject = buildErrorObject;
exports.buildSuccessResponse = buildSuccessResponse;
exports.checkMissingParameter = checkMissingParameter;
exports.handleMissingParameter = handleMissingParameter;

var _logger = _interopRequireDefault(require("../logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function buildErrorObject(res, {
  status = 400,
  error
}) {
  _logger.default.error(error);

  const errorResp = {
    kind: "Error",
    error
  };
  return res.status(status).json(errorResp);
}

function buildSuccessResponse(res, {
  status = 200,
  data
}) {
  // console.log("returned", data);
  return res.status(status).json(data);
}

function checkMissingParameter(array) {
  return array.some(param => param === undefined || param === null);
}

function handleMissingParameter(res) {
  return buildErrorObject(res, {
    status: 400,
    error: "Missing some required parameters"
  });
}
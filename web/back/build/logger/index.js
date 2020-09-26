"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _winston = require("winston");

var _logger = _interopRequireDefault(require("../config/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const logger = new _winston.createLogger({
  level: _logger.default.logLevel,
  format: _winston.format.combine(_winston.format.splat(), _winston.format.simple()),
  transports: [new _winston.transports.Console({
    timestamp: true,
    colorize: true
  })],
  exitOnError: false // do not exit on handled exceptions,

}); // create a stream object with a 'write' function that will be used by `morgan`

logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};
var _default = logger;
exports.default = _default;
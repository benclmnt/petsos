"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _db = _interopRequireDefault(require("../config/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${_db.default.user}:${_db.default.password}@${_db.default.host}:${_db.default.port}/${_db.default.database}`;
const pool = new _pg.Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});
pool.on("connect", () => {
  console.log("connected to the db");
});
pool.on("error", () => {
  console.error.bind(console, "Postgres connection error: ");
});
var _default = pool;
exports.default = _default;
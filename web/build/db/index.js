"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.query = query;
exports.getClient = getClient;

var _pool = _interopRequireDefault(require("./pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * DB Query
 *
 * @param {String} queryText
 * @param {object} params
 * @returns {Promise} object
 */
function query(queryText, params) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    _pool.default.query(queryText, params).then(res => {
      const duration = Date.now() - start;
      console.log('executed query', {
        queryText,
        duration,
        rows: res.rowCount
      });
      resolve(res.rows);
    }).catch(err => {
      reject(err);
    });
  });
}
/**
 * Acquire a client from pool
 *
 * @returns {object} client
 */


function getClient() {
  return _pool.default.connect();
}
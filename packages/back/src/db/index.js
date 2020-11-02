import pool from "./pool";

/**
 * DB Query
 *
 * @param {String} queryText
 * @param {object} params
 * @returns {Promise} object
 */
export function query(queryText, params) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    pool
      .query(queryText, params)
      .then((res) => {
        const duration = Date.now() - start;
        console.log(
          "executed query",
          {
            queryText,
            duration,
            rows: res.rowCount,
          },
          "with params",
          params
        );
        resolve(res.rows);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Acquire a client from pool
 *
 * @returns {object} client
 */
export function getClient() {
  return pool.connect();
}

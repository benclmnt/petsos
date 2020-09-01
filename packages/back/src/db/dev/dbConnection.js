import pool from './pool';

pool.on('connect', () => {
  console.log('connected to the db');
});

pool.on('error', () => {
  console.error.bind(console, 'Postgres connection error: ');
});

const getUsers = (request, response) => {
  const getUsersQuery = 'SELECT * FROM users ORDER BY id ASC';
  return pool
    .query(getUsersQuery)
    .then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getUsers,
};

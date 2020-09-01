import express from 'express';
import logger from 'loglevel';
import db from '../db/dev/dbConnection';

function getFooRoutes() {
  const router = express.Router();
  router.get('/', foo);
  return router;
}

async function foo(req, res) {
  const users = await db.getUsers();
  res.json({
    foo: 'true',
    message: users,
  });
}

export { getFooRoutes };

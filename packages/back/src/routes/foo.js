import express from 'express';
import logger from '../logger';
import { query } from '../db';
import { getUsers } from '../db/queries';

function getFooRoutes() {
  const router = express.Router();
  router.get('/', foo);
  return router;
}

async function foo(req, res) {
  const users = await query(getUsers);
  return res.json({
    foo: 'true',
    message: users,
  });
}

export { getFooRoutes };

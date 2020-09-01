import express from 'express';
import logger from 'loglevel';

function getFooRoutes() {
  const router = express.Router();
  router.get('/', foo);
  return router;
}

async function foo(req, res) {
  logger.warn('foo!!');
  res.json({
    foo: 'true',
    message: 'You succeed!',
  });
}

export { getFooRoutes };

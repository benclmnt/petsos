import express from 'express';
import { getFooRoutes } from './foo';

function getRoutes() {
  const router = express.Router();
  router.use('/foo', getFooRoutes());
  return router;
}

export { getRoutes };

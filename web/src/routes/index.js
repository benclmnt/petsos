import express from 'express';
import { getUsersRoutes } from './users';

function getRoutes() {
  const router = express.Router();

  router.use('/users', getUsersRoutes());

  return router;
}

export { getRoutes };

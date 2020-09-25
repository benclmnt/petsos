<<<<<<< HEAD
import express from 'express';
import { getUsersRoutes } from './users';

function getRoutes() {
  const router = express.Router();

  router.use('/users', getUsersRoutes());

  return router;
}

export { getRoutes };
=======
import express from 'express';
import { getFooRoutes } from './foo';

function getRoutes() {
  const router = express.Router();
  router.use('/foo', getFooRoutes());
  return router;
}

export { getRoutes };
>>>>>>> Design edit profile pagge V1

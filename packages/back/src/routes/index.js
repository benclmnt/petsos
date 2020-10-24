import express from 'express';
import { getUsersRoutes } from './users';
import { getUsersRoutesPets } from './pets';

function getRoutes() {
  const router = express.Router();

  // router.use((req, res, next) => {
  //   res.requestedUrl = req.originalUrl;
  //   next();
  // });

  router.use('/pets', getUsersRoutesPets());
  router.use('/users', getUsersRoutes());

  return router;
}

export { getRoutes };

import express from "express";
import { getUsersRoutes } from "./users";
import { getPetCategoriesRoutes } from "./pets";
import { getCaretakersRoutes } from "./caretakers";
import { getAdminRoutes } from "./admin";
import { getJobsRoutes } from "./jobs";

function getRoutes() {
  const router = express.Router();

  // router.use((req, res, next) => {
  //   res.requestedUrl = req.originalUrl;
  //   next();
  // });

  router.use("/pets", getPetCategoriesRoutes());
  router.use("/users", getUsersRoutes());
  router.use("/caretakers", getCaretakersRoutes());
  router.use("/admin", getAdminRoutes());
  router.use("/jobs", getJobsRoutes());

  return router;
}

export { getRoutes };

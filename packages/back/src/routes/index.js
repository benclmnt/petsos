import express from "express";
import { getUsersRoutes } from "./users";
import { getPetCategoriesRoutes } from "./pets";
import { getCaretakersRoutes } from "./caretakers";

function getRoutes() {
  const router = express.Router();

  // router.use((req, res, next) => {
  //   res.requestedUrl = req.originalUrl;
  //   next();
  // });

  router.use("/pets", getPetCategoriesRoutes());
  router.use("/users", getUsersRoutes());
  router.use("/caretakers", getCaretakersRoutes());

  return router;
}

export { getRoutes };

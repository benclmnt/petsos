import express from "express";
import logger from "../logger";
import { query } from "../db";
import {
  addPet,
  queryPetByPouname,
  queryPetByPounameAndName,
  deletePetByPounameAndName,
  deletePetCategoryBySpeciesBreedSize,
  queryPetCategories,
  addPetCategory,
  updatePetCategory,
  updatePetInfo,
} from "../db/queries";

function getUsersRoutesPets() {
  const router = express.Router();
  router.post("/addNewPet", insertNewPetToTable);
  router.get("/getPetByPouname/:pouname", getPetByPouname);
  router.get("/getPetByPounameAndName/:pouname/:name", getPetByPounameAndName);
  router.get("/getPetCategoriesTable", getPetCategoriesTable);
  router.delete("/deletePetByPounameAndName", removePetByPounameAndName);
  router.delete(
    "/deletePetCategoryBySpciesBreedSize",
    removePetCategoryBySpeciesBreedSize
  );
  router.post("/addNewPetCategory", insertNewPetCategory);
  router.post("/updatePetCategory", upgradePetCategory);
  router.post("/updatePetInformation", upgradePetInfo);
  return router;
}

async function upgradePetInfo(req, res) {
  const { name, pouname, species, breed, size } = req.body;
  const params = [name, pouname, species, breed, size];
  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(updatePetInfo, params);
  } catch (err) {
    console.log(err);
    return buildUsersErrorObject(res, {
      status: 400,
      error: "Pet does not exist in the table",
    });
  }

  const user = await query(queryPetByPounameAndName, [pouname, name]);
  console.log(user);
  return buildSuccessResponse(res, {
    user,
  });
}

async function upgradePetCategory(req, res) {
  const { species, breed, size, base_price } = req.body;
  const params = [species, breed, size, base_price];
  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(updatePetCategory, params);
  } catch (err) {
    console.log(err);
    return buildUsersErrorObject(res, {
      status: 400,
      error: "Pet does not exist in the table",
    });
  }

  const user = await query(queryPetCategories, [pouname]);
  console.log(user);
  return buildSuccessResponse(res, {
    user,
  });
}

async function removePetCategoryBySpeciesBreedSize(req, res) {
  const { species, breed, size } = req.body;
  const params = [species, breed, size];
  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(deletePetCategoryBySpeciesBreedSize, params);
  } catch (err) {
    console.log(err);
    return buildUsersErrorObject(res, {
      status: 400,
      error: "Pet does not exist in the table",
    });
  }

  const user = await query(queryPetCategories, [pouname]);
  console.log(user);
  return buildSuccessResponse(res, {
    user,
  });
}

/**
 * Insert new pet to table
 */
async function insertNewPetCategory(req, res) {
  const { species, breed, size, base_price } = req.body;
  const params = [species, breed, size, base_price];
  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(addPetCategory, params);
  } catch (err) {
    console.log(err);
    return buildUsersErrorObject(res, {
      status: 400,
      error: "Pet has already existed",
    });
  }
  const user = await query("SELECT * FROM pet_categories;");
  console.log(user);
  return buildSuccessResponse(res, {
    user,
  });
}
/**
 * Insert new pet to table
 */
async function insertNewPetToTable(req, res) {
  const { name, pouname, species, breed, size } = req.body;
  const params = [name, pouname, species, breed, size];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    console.log(params);
    await query(addPet, params);
  } catch (err) {
    console.log(err);
    return buildUsersErrorObject(res, {
      status: 400,
      error: "Pet has already existed",
    });
  }

  // TODO: Drake to fix return data
  const user = await query("SELECT * FROM pets;");
  console.log(user);
  return buildSuccessResponse(res, {
    user,
  });
}

async function getPetByPouname(req, res) {
  const pouname = req.params.pouname;
  const params = [pouname];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  const users = await query(queryPetByPouname, params);

  console.log(users);

  checkUserExists(res, users);

  return buildSuccessResponse(res, {
    user: buildUsersObject(users),
  });
}

async function getPetCategoriesTable(req, res) {
  const users = await query(queryPetCategories);

  console.log(users);

  checkUserExists(res, users);

  return buildSuccessResponse(res, {
    user: buildUsersObject(users),
  });
}

async function getPetByPounameAndName(req, res) {
  const pouname = req.params.pouname;
  const name = req.params.name;
  const params = [pouname, name];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  const users = await query(queryPetByPounameAndName, params);

  checkUserExists(res, users);

  return buildSuccessResponse(res, {
    user: buildUsersObject(users),
  });
}

async function removePetByPounameAndName(req, res) {
  const { name, pouname } = req.body;
  const params = [pouname, name];
  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(deletePetByPounameAndName, params);
  } catch (err) {
    console.log(err);
    return buildUsersErrorObject(res, {
      status: 400,
      error: "Pet does not exist in the table",
    });
  }

  const user = await query(queryPetCategories, [pouname]);
  console.log(user);
  return buildSuccessResponse(res, {
    user,
  });
}

export { getUsersRoutesPets };

/**
 * PRIVATE FUNCTIONS
 */

function buildUsersErrorObject(res, { status, error }) {
  logger.error(error);

  const errorResp = {
    kind: "Error",
    error,
  };

  return res.status(status).json(errorResp);
}

function buildUsersObject(user) {
  const obj = {
    kind: "User",
    ...user,
    selfLink: `/users/${user.username}`,
  };
  delete obj.password;
  return obj;
}

function buildSuccessResponse(res, { status, user }) {
  return res.status(status || 200).json(user);
}

function checkUserExists(res, users) {
  if (users.length === 0) {
    return buildUsersErrorObject(res, {
      status: 400,
      error: "Cannot find user",
    });
  }
}

function checkMissingParameter(array) {
  return array.some((param) => param === undefined || param === null);
}

function handleMissingParameter(res) {
  return buildUsersErrorObject(res, {
    status: 400,
    error: "Missing some required parameters",
  });
}

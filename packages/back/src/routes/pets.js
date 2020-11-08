import express from "express";
import logger from "../logger";
import { query } from "../db";
import {
  addPet as addPetQuery,
  queryPetByPouname,
  queryPetByPounameAndName,
  deletePetByPounameAndName,
  deletePetCategoryBySpeciesBreedSize,
  queryPetCategories as getAllPetCategories,
  addPetCategory as addPetCategoryQuery,
  updatePetCategory as updatePetCategoryQuery,
  updatePetInfo as updatePetInfoQuery,
  addPetSpecialRequirementsQuery,
  listAllPetRequirementsQuery,
  deletePetSpecialRequirementsQuery,
  getPetSpecialRequirementsQuery,
} from "../db/queries";
import {
  buildErrorObject,
  buildSuccessResponse,
  checkMissingParameter,
  handleMissingParameter,
} from "./utils";

function getPetCategoriesRoutes() {
  const router = express.Router();
  router.put("/categories", updatePetCategory);
  router.post("/categories", insertNewPetCategory);
  router.get("/categories", listPetCategories);
  router.delete("/categories", removePetCategoryBySpeciesBreedSize);
  return router;
}

// the below routes will be imported under /users/:username
function getUsersPetsRoutes() {
  // get params from parent router
  const router = express.Router({ mergeParams: true });
  router.post("/pets/:petname", updatePetInfo);
  router.get("/pets/:petname", getUsersPetsByName);
  router.delete("/pets", deletePet);
  router.post("/pets", createPet);
  router.get("/pets", listUsersPets);
  router.post("/specialReq", addPetSpecialReqFunc);
  router.delete("/specialReq", deletePetSpecialReqFunc);
  router.get("/specialReq/:petname", getPetSpecialReqFunc);
  return router;
}

async function getPetSpecialReqFunc(req, res) {
  const { username: pouname, petname } = req.params;
  const params = [pouname, petname];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  const petReqs = await query(getPetSpecialRequirementsQuery, params);

  return buildSuccessResponse(res, {
    data: buildObject(petReqs),
  });
}

/**
 * Delete pet special requirements from table
 */
async function deletePetSpecialReqFunc(req, res) {
  const { petname } = req.body;
  const { username: pouname } = req.params;
  const params = [pouname, petname];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    const deletedPetSpecialReq = await query(
      deletePetSpecialRequirementsQuery,
      params
    );
    const pets = await query(queryPetByPouname, [pouname]);
    return buildSuccessResponse(res, {
      data: {
        pets: pets.map((pet) => buildPetsObject(pet)),
        deletedPet: deletedPetSpecialReq[0],
      },
    });
  } catch (err) {
    console.error(err);
    return buildErrorObject(res, {
      error: err.message,
    });
  }
}

/**
 * Insert new pet requirements to table
 */
async function addPetSpecialReqFunc(req, res) {
  const { petname, description } = req.body;
  const { username: pouname } = req.params;
  const params = [pouname, petname, description];

  console.log(params);

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(addPetSpecialRequirementsQuery, params);
  } catch (err) {
    console.error(err);
    return buildErrorObject(res, {
      status: 400,
      error: "Pet requirements has already existed",
    });
  }

  const petsRequirements = await query(listAllPetRequirementsQuery, [
    pouname,
    petname,
  ]);
  return buildSuccessResponse(res, {
    data: petsRequirements.map((pet) => buildPetsObject(pet, petname)),
  });
}

async function listUsersPets(req, res) {
  const { username: pouname } = req.params;
  const params = [pouname];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  const pets = await query(queryPetByPouname, params);

  return buildSuccessResponse(res, {
    data: pets.map((pet) => buildPetsObject(pet, pouname)),
  });
}

async function getUsersPetsByName(req, res) {
  const { username: pouname, petname: name } = req.params;
  const params = [pouname, name];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  const pets = await query(queryPetByPounameAndName, params);

  if (pets.length == 0) {
    return buildErrorObject(res, {
      error: "Pet not found",
    });
  }

  return buildSuccessResponse(res, {
    data: buildPetsObject(pets[0], pouname),
  });
}

/**
 * Insert new pet to table
 */
async function createPet(req, res) {
  const { name, species, breed, size } = req.body;
  const { username: pouname } = req.params;
  const params = [name, pouname, species, breed, size];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(addPetQuery, params);
  } catch (err) {
    console.error(err);
    return buildErrorObject(res, {
      status: 400,
      error: "Pet has already existed",
    });
  }

  const pets = await query(queryPetByPouname, [pouname]);
  return buildSuccessResponse(res, {
    data: pets.map((pet) => buildPetsObject(pet, pouname)),
  });
}

async function updatePetInfo(req, res) {
  const { username: pouname, petname: name } = req.params;
  const { name: newName = name, species, breed, size } = req.body;
  const params = [name, pouname, species, breed, size, newName];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    const updatedPet = await query(updatePetInfoQuery, params);
    return buildSuccessResponse(res, {
      data: buildPetsObject(updatedPet),
    });
  } catch (err) {
    console.error(err);
    return buildErrorObject(res, {
      error: err.message,
    });
  }
}

async function deletePet(req, res) {
  const { username: pouname } = req.params;
  const { name } = req.body;
  const params = [pouname, name];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    const deletedPet = await query(deletePetByPounameAndName, params);
    const pets = await query(queryPetByPouname, [pouname]);
    return buildSuccessResponse(res, {
      data: {
        pets: pets.map((pet) => buildPetsObject(pet)),
        deletedPet: deletedPet[0],
      },
    });
  } catch (err) {
    console.error(err);
    return buildErrorObject(res, {
      error: err.message,
    });
  }
}

/**
 * Insert new pet category to table
 */
async function insertNewPetCategory(req, res) {
  const { species, breed, size, base_price } = req.body;
  const params = [species, breed, size, base_price];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(addPetCategoryQuery, params);
  } catch (err) {
    console.error(err);
    return buildErrorObject(res, {
      error: err.message,
    });
  }
  const pet_categories = await query(getAllPetCategories);
  return buildSuccessResponse(res, {
    data: pet_categories,
  });
}

async function updatePetCategory(req, res) {
  const { species, breed, size, base_price } = req.body;
  const params = [species, breed, size, base_price];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(updatePetCategoryQuery, params);
  } catch (err) {
    console.error(err);
    return buildErrorObject(res, {
      error: err.message,
    });
  }

  const pet_categories = await query(getAllPetCategories);
  return buildSuccessResponse(res, {
    data: pet_categories,
  });
}

async function removePetCategoryBySpeciesBreedSize(req, res) {
  const { species, breed, size } = req.body;
  const params = [species, breed, size];

  if (checkMissingParameter(params)) {
    return handleMissingParameter(res);
  }

  try {
    await query(deletePetCategoryBySpeciesBreedSize, params);
  } catch (err) {
    console.error(err);
    return buildErrorObject(res, {
      error: err.message,
    });
  }

  const pet_categories = await query(getAllPetCategories);
  return buildSuccessResponse(res, {
    data: pet_categories,
  });
}

async function listPetCategories(req, res) {
  const pet_categories = await query(getAllPetCategories);

  console.log("HAHAHAAHAHAH");
  return buildSuccessResponse(res, {
    data: pet_categories,
  });
}

export { getPetCategoriesRoutes, getUsersPetsRoutes };

/**
 * PRIVATE FUNCTIONS
 */

function buildPetsObject(pet, pouname) {
  const obj = {
    kind: "Pet",
    ...pet,
    selfLink: `/users/${pouname}/pets/${pet?.name}`,
    parentLink: `/users/${pouname}`,
  };
  return obj;
}

function buildObject(user) {
  const obj = {
    kind: "User",
    ...user,
    selfLink: `/users/${user.username}`,
  };
  delete obj.password;
  return obj;
}

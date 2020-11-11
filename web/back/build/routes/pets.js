"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPetCategoriesRoutes = getPetCategoriesRoutes;
exports.getUsersPetsRoutes = getUsersPetsRoutes;

var _express = _interopRequireDefault(require("express"));

var _logger = _interopRequireDefault(require("../logger"));

var _db = require("../db");

var _queries = require("../db/queries");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPetCategoriesRoutes() {
  const router = _express.default.Router();

  router.put("/categories", updatePetCategory);
  router.post("/categories", insertNewPetCategory);
  router.get("/categories", listPetCategories);
  router.delete("/categories", removePetCategoryBySpeciesBreedSize);
  return router;
} // the below routes will be imported under /users/:username


function getUsersPetsRoutes() {
  // get params from parent router
  const router = _express.default.Router({
    mergeParams: true
  });

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
  const {
    username: pouname,
    petname
  } = req.params;
  const params = [pouname, petname];
  console.log(params);

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  const petReqs = await (0, _db.query)(_queries.getPetSpecialRequirementsQuery, params);
  return (0, _utils.buildSuccessResponse)(res, {
    data: buildObject(petReqs)
  });
}
/**
 * Delete pet special requirements from table
 */


async function deletePetSpecialReqFunc(req, res) {
  const {
    petname
  } = req.body;
  const {
    username: pouname
  } = req.params;
  const params = [pouname, petname];
  console.log(params);

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    const deletedPetSpecialReq = await (0, _db.query)(_queries.deletePetSpecialRequirementsQuery, params);
    const pets = await (0, _db.query)(_queries.queryPetByPouname, [pouname]);
    return (0, _utils.buildSuccessResponse)(res, {
      data: {
        pets: pets.map(pet => buildPetsObject(pet)),
        deletedPet: deletedPetSpecialReq[0]
      }
    });
  } catch (err) {
    console.error(err);
    return (0, _utils.buildErrorObject)(res, {
      error: err.message
    });
  }
}
/**
 * Insert new pet requirements to table
 */


async function addPetSpecialReqFunc(req, res) {
  const {
    petname,
    description
  } = req.body;
  const {
    username: pouname
  } = req.params;
  const params = [pouname, petname, description];
  console.log(params);

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    await (0, _db.query)(_queries.addPetSpecialRequirementsQuery, params);
  } catch (err) {
    console.error(err);
    return (0, _utils.buildErrorObject)(res, {
      status: 400,
      error: "Pet requirements has already existed"
    });
  }

  const petsRequirements = await (0, _db.query)(_queries.listAllPetRequirementsQuery, [pouname, petname]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: petsRequirements.map(pet => buildPetsObject(pet, petname))
  });
}

async function listUsersPets(req, res) {
  const {
    username: pouname
  } = req.params;
  const params = [pouname];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  const pets = await (0, _db.query)(_queries.queryPetByPouname, params);
  return (0, _utils.buildSuccessResponse)(res, {
    data: pets.map(pet => buildPetsObject(pet, pouname))
  });
}

async function getUsersPetsByName(req, res) {
  const {
    username: pouname,
    petname: name
  } = req.params;
  const params = [pouname, name];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  const pets = await (0, _db.query)(_queries.queryPetByPounameAndName, params);

  if (pets.length == 0) {
    return (0, _utils.buildErrorObject)(res, {
      error: "Pet not found"
    });
  }

  return (0, _utils.buildSuccessResponse)(res, {
    data: buildPetsObject(pets[0], pouname)
  });
}
/**
 * Insert new pet to table
 */


async function createPet(req, res) {
  const {
    name,
    species,
    breed,
    size
  } = req.body;
  const {
    username: pouname
  } = req.params;
  const params = [name, pouname, species, breed, size];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    await (0, _db.query)(_queries.addPet, params);
  } catch (err) {
    console.error(err);
    return (0, _utils.buildErrorObject)(res, {
      status: 400,
      error: "Pet has already existed"
    });
  }

  const pets = await (0, _db.query)(_queries.queryPetByPouname, [pouname]);
  return (0, _utils.buildSuccessResponse)(res, {
    data: pets.map(pet => buildPetsObject(pet, pouname))
  });
}

async function updatePetInfo(req, res) {
  const {
    username: pouname,
    petname: name
  } = req.params;
  const {
    name: newName = name,
    species,
    breed,
    size
  } = req.body;
  const params = [name, pouname, species, breed, size, newName];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    const updatedPet = await (0, _db.query)(_queries.updatePetInfo, params);
    return (0, _utils.buildSuccessResponse)(res, {
      data: buildPetsObject(updatedPet)
    });
  } catch (err) {
    console.error(err);
    return (0, _utils.buildErrorObject)(res, {
      error: err.message
    });
  }
}

async function deletePet(req, res) {
  const {
    username: pouname
  } = req.params;
  const {
    name
  } = req.body;
  const params = [pouname, name];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    const deletedPet = await (0, _db.query)(_queries.deletePetByPounameAndName, params);
    const pets = await (0, _db.query)(_queries.queryPetByPouname, [pouname]);
    return (0, _utils.buildSuccessResponse)(res, {
      data: {
        pets: pets.map(pet => buildPetsObject(pet)),
        deletedPet: deletedPet[0]
      }
    });
  } catch (err) {
    console.error(err);
    return (0, _utils.buildErrorObject)(res, {
      error: err.message
    });
  }
}
/**
 * Insert new pet category to table
 */


async function insertNewPetCategory(req, res) {
  const {
    species,
    breed,
    size,
    base_price
  } = req.body;
  const params = [species, breed, size, base_price];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    await (0, _db.query)(_queries.addPetCategory, params);
  } catch (err) {
    console.error(err);
    return (0, _utils.buildErrorObject)(res, {
      error: err.message
    });
  }

  const pet_categories = await (0, _db.query)(_queries.queryPetCategories);
  return (0, _utils.buildSuccessResponse)(res, {
    data: pet_categories
  });
}

async function updatePetCategory(req, res) {
  const {
    species,
    breed,
    size,
    base_price
  } = req.body;
  const params = [species, breed, size, base_price];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    await (0, _db.query)(_queries.updatePetCategory, params);
  } catch (err) {
    console.error(err);
    return (0, _utils.buildErrorObject)(res, {
      error: err.message
    });
  }

  const pet_categories = await (0, _db.query)(_queries.queryPetCategories);
  return (0, _utils.buildSuccessResponse)(res, {
    data: pet_categories
  });
}

async function removePetCategoryBySpeciesBreedSize(req, res) {
  const {
    species,
    breed,
    size
  } = req.body;
  const params = [species, breed, size];

  if ((0, _utils.checkMissingParameter)(params)) {
    return (0, _utils.handleMissingParameter)(res);
  }

  try {
    await (0, _db.query)(_queries.deletePetCategoryBySpeciesBreedSize, params);
  } catch (err) {
    console.error(err);
    return (0, _utils.buildErrorObject)(res, {
      error: err.message
    });
  }

  const pet_categories = await (0, _db.query)(_queries.queryPetCategories);
  return (0, _utils.buildSuccessResponse)(res, {
    data: pet_categories
  });
}

async function listPetCategories(req, res) {
  const pet_categories = await (0, _db.query)(_queries.queryPetCategories);
  console.log("HAHAHAAHAHAH");
  return (0, _utils.buildSuccessResponse)(res, {
    data: pet_categories
  });
}

/**
 * PRIVATE FUNCTIONS
 */
function buildPetsObject(pet, pouname) {
  const obj = {
    kind: "Pet",
    ...pet,
    selfLink: `/users/${pouname}/pets/${pet === null || pet === void 0 ? void 0 : pet.name}`,
    parentLink: `/users/${pouname}`
  };
  return obj;
}

function buildObject(user) {
  const obj = {
    kind: "User",
    ...user,
    selfLink: `/users/${user.username}`
  };
  delete obj.password;
  return obj;
}
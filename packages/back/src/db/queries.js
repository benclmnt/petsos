// User-related queries
export const getAllUsers = "SELECT * FROM users LIMIT 25;";
export const queryUserByUsername =
  "\
SELECT u.*, ct.ct_type, (ct.ctuname IS NOT NULL) as is_caretaker,\
(admin.username IS NOT NULL) as is_admin, (po.username IS NOT NULL) as is_petowner FROM users u\
  LEFT JOIN pet_owners po\
  ON u.username = po.username\
  LEFT JOIN caretakers ct\
  ON u.username = ct.ctuname\
  LEFT JOIN pcs_admin admin\
  ON u.username = admin.username\
  WHERE u.username = $1;";
export const registerUser =
  "INSERT INTO users(username, email, password) VALUES ($1, $2, $3);";
export const deleteUser = "DELETE FROM users WHERE username = $1";
export const editUser =
  "UPDATE users SET email = $2, address = $3, city = $4, country = $5, postal_code = $6 WHERE username = $1 RETURNING *";
export const addPet =
  "INSERT INTO pets(name, pouname, species, breed, size) VALUES ($1, $2, $3, $4, $5);";
export const addPetCategory =
  "INSERT INTO pet_categories(species, breed, size, base_price) VALUES ($1, $2, $3, $4);";
export const queryPetByPouname = "SELECT * FROM pets WHERE pouname = $1;";
export const queryPetByPounameAndName =
  "SELECT * FROM pets WHERE pouname = $1 AND name = $2;";
export const deletePetByPounameAndName =
  "DELETE FROM pets WHERE pouname = $1 AND name = $2 RETURNING *;";
export const deletePetCategoryBySpeciesBreedSize =
  "DELETE FROM pet_categories WHERE species = $1 AND breed = $2 AND size = $3;";
export const updatePetCategory =
  "UPDATE pet_categories SET base_price = $4 WHERE species = $1 AND breed = $2 AND size = $3;";
export const updatePetInfo =
  "UPDATE pets SET species = $3, breed = $4, size = $5, name = $6 WHERE name = $1 AND pouname = $2 RETURNING *;";
export const queryPetCategories =
  "SELECT * FROM pet_categories GROUP BY species,breed,size ORDER by species;";
export const queryPetByName = "SELECT * FROM pets WHERE name = $1;";

// Caretaker-related queries
export const queryCaretakerByUsername =
  "SELECT * FROM caretakers WHERE ctuname = $1;";
export const queryBreedsBySpecies =
  "SELECT * FROM pet_categories WHERE species = $1;";
export const insertNewCaretaker =
  "INSERT INTO caretakers(ctuname, ct_type) VALUES ($1, $2);";
export const getAllCaretakers = "SELECT * FROM caretakers LIMIT 25;";
export const upsertCaretakerAddress =
  "INSERT INTO caretakers(ctuname, avg_rating, caretaker_type) VALUES ($1, $2, $3);";
export const upsertCaretakerAvailability =
  "INSERT INTO availability_span(ctuname, start_date, end_date) VALUES ($1, $2, $3);";
export const upsertCaretakerCapability =
  "INSERT INTO is_capable(species, breed, size, ctuname) VALUES ($1, $2, $3, $4);";

// Queries to search caretakers
export const querySearchCaretakers =
  "SELECT * FROM all_ct WHERE service = $1 AND postal_code = $2 AND start_date >= $3 AND end_date <= $4 AND pc_species = $5 AND pc_breed = $6 AND pc_size = $7;";
export const getPetCategories = "SELECT * FROM pet_categories;";

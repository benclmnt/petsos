// User-related queries
export const getAllUsers = 'SELECT * FROM users LIMIT 25;';
export const queryUserByUsername = 'SELECT * FROM users WHERE username = $1;';
export const queryUserByEmail = 'SELECT * FROM users WHERE email = $1;';
export const registerUser =
  'INSERT INTO users(username, email, password) VALUES ($1, $2, $3);';
export const upsertUserAddress =
  'UPDATE users SET address = $2, city = $3, country = $4, postal_code = $5 WHERE username = $1;';
export const addPet =
  'INSERT INTO pets(name, pouname, species, breed, size) VALUES ($1, $2, $3, $4, $5);';
export const addPetCategory =
  'INSERT INTO pet_categories(species, breed, size, base_price) VALUES ($1, $2, $3, $4);';
export const queryPetByPouname = 'SELECT * FROM pets WHERE pouname = $1;';
export const queryPetByPounameAndName =
  'SELECT * FROM pets WHERE pouname = $1 AND name = $2;';
export const deletePetByPounameAndName =
  'DELETE FROM pets WHERE pouname = $1 AND name = $2;';
export const deletePetCategoryBySpeciesBreedSize =
  'DELETE FROM pet_categories WHERE species = $1 AND breed = $2 AND size = $3;';
export const updatePetCategory =
  'UPDATE pet_categories SET base_price = $4 WHERE species = $1 AND breed = $2 AND size = $3;';
export const updatePetInfo =
  'UPDATE pets SET species = $3, breed = $4, size = $5 WHERE name = $1 AND pouname = $2;';
export const queryPetCategories =
  'SELECT * FROM pet_categories GROUP BY species,breed,size ORDER by species;';
export const queryPetByName = 'SELECT * FROM pets WHERE name = $1;';

// Caretaker-related queries

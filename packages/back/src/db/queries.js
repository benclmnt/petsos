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
export const queryPetByName = 'SELECT * FROM pets WHERE name = $1;';

// Caretaker-related queries
export const queryCaretakerByUsername =
  'SELECT * FROM caretakers WHERE ctuname = $1;';
export const queryBreedsBySpecies =
  'SELECT * FROM pet_categories WHERE species = $1;';
export const insertNewCaretaker =
  'INSERT INTO caretakers(ctuname, ct_type) VALUES ($1, $2);';
export const getAllCaretakers = 'SELECT * FROM caretakers LIMIT 25;';
export const upsertCaretakerAddress =
  'INSERT INTO caretakers(ctuname, avg_rating, caretaker_type) VALUES ($1, $2, $3);';
export const upsertCaretakerAvailability =
  'INSERT INTO availability_span(ctuname, start_date, end_date) VALUES ($1, $2, $3);';
export const upsertCaretakerCapability =
  'INSERT INTO is_capable(pc_species, pc_breed, pc_size, ctuname) VALUES ($1, $2, $3, $4);';

// Queries to search caretakers
export const querySearchCaretakers =
  'SELECT * FROM all_ct WHERE service = $1 AND postal_code = $2 AND start_date >= $3 AND end_date <= $4 AND pc_species = $5 AND pc_breed = $6 AND pc_size = $7;';
export const getPetCategories = 'SELECT * FROM pet_categories;';

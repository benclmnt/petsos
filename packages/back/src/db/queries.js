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

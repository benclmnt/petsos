// User-related queries
export const getAllUsers = 'SELECT * FROM users LIMIT 25;';
export const queryUserByUsername = 'SELECT * FROM users WHERE username = $1;';
export const queryUserByEmail = 'SELECT * FROM users WHERE email = $1;';
export const registerUser =
  'INSERT INTO users(username, email, password) VALUES ($1, $2, $3);';
export const upsertUserAddress =
  'UPDATE users SET address = $2, city = $3, country = $4, postal_code = $5 WHERE username = $1;';

// Caretaker-related queries
export const getAllCaretakers = 'SELECT * FROM caretakers LIMIT 25;';
export const queryCaretakerByUsername =
  'SELECT * FROM caretakers WHERE username = $1;';
export const registerCaretaker =
  'INSERT INTO caretakers(username, caretaker_type) VALUES ($1, $3);';
export const upsertCaretakerCapability =
  'UPDATE is_capable SET pc_breed = $2, pc_sze = $3, pc_name = $4 WHERE ctuname = $1;';

export const getAllUsers = 'SELECT * FROM users LIMIT 25';
export const queryUserById = 'SELECT * FROM users WHERE id = $1';
export const queryUserByEmail = 'SELECT * FROM users WHERE email = $1';
export const registerUser =
  'INSERT INTO users(name, email, password) VALUES ($1, $2, $3)';

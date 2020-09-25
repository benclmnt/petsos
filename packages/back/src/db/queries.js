export const getAllUsers = 'SELECT * FROM users LIMIT 25';

export const registerUser =
  'INSERT INTO users(name, email, password) VALUES ($1, $2, $3)';

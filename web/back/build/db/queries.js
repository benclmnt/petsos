"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.upsertUserAddress = exports.registerUser = exports.queryUserByEmail = exports.queryUserByUsername = exports.getAllUsers = void 0;
// User-related queries
const getAllUsers = 'SELECT * FROM users LIMIT 25;';
exports.getAllUsers = getAllUsers;
const queryUserByUsername = 'SELECT * FROM users WHERE username = $1;';
exports.queryUserByUsername = queryUserByUsername;
const queryUserByEmail = 'SELECT * FROM users WHERE email = $1;';
exports.queryUserByEmail = queryUserByEmail;
const registerUser = 'INSERT INTO users(username, email, password) VALUES ($1, $2, $3);';
exports.registerUser = registerUser;
const upsertUserAddress = 'UPDATE users SET address = $2, city = $3, country = $4, postal_code = $5 WHERE username = $1;'; // Caretaker-related queries

exports.upsertUserAddress = upsertUserAddress;
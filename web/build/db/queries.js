"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUser = exports.queryUserByEmail = exports.queryUserById = exports.getAllUsers = void 0;
const getAllUsers = 'SELECT * FROM users LIMIT 25';
exports.getAllUsers = getAllUsers;
const queryUserById = 'SELECT * FROM users WHERE id = $1';
exports.queryUserById = queryUserById;
const queryUserByEmail = 'SELECT * FROM users WHERE email = $1';
exports.queryUserByEmail = queryUserByEmail;
const registerUser = 'INSERT INTO users(name, email, password) VALUES ($1, $2, $3)';
exports.registerUser = registerUser;
import { client, LOCAL_STORAGE_KEY } from './client';

function handleUserResponse({ token, ...user }) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, token);

  // redirect user to homepage
  window.location.replace('/');
  return user;
}

// return either a user object or null
// function getUser() {
//   const token = getToken();
//   if (!token) {
//     return Promise.resolve(null);
//   }
//   return client(API_WHOAMI).then(data => data.user);
// }

function login({ email, password }) {
  return client('/login', { body: { user: { email, password } } }).then(
    handleUserResponse
  );
}

function register({ name, email, password }) {
  return client('/register', {
    body: { user: { name, email, password } },
  }).then(handleUserResponse);
}

function logout() {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);

  // refreshes the page for the user
  window.location.assign(window.location);
}

function getToken() {
  return window.localStorage.getItem(LOCAL_STORAGE_KEY);
}

function isLoggedIn() {
  return Boolean(getToken());
}

export { login, register, logout, getToken, isLoggedIn };

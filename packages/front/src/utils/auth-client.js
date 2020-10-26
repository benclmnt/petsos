import { client, LOCAL_STORAGE_KEY } from "./client";

function handleUserResponse(user) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, user.username);
  // redirect user to homepage
  window.location.replace("/");
  return user;
}

function login({ email, password }) {
  return client("/users/login", { body: { email, password } }).then(
    handleUserResponse
  );
}

function register({ username, email, password }) {
  console.log(username, email, password);
  return client("/users/register", {
    body: { username, email, password },
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

function getUser() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null);
  }
  return client(`/users/${getToken()}`);
}

function isLoggedIn() {
  return Boolean(getToken());
}

export { login, register, logout, getToken, getUser, isLoggedIn };

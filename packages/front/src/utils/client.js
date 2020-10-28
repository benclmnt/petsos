import { logout } from "./auth-client";

// endpoint should start with a /

// customConfig params
// - headers
// - method
// - body : will be JSONified.
// - file (There is some unique things about files)!
// - onSuccess : fn to execute on success
// - redirecTo: string (starting with /)

export const LOCAL_STORAGE_KEY = "token";

export async function client(endpoint, { body, file, ...customConfig } = {}) {
  const token = window.localStorage.getItem(LOCAL_STORAGE_KEY);
  const headers = { "Content-Type": "application/json" };

  if (token) {
    headers.Authorization = `${token}`;
  }

  const config = {
    method: customConfig.method ?? (body || file ? "POST" : "GET"),
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  console.log(config);

  if (file) {
    config.body = file;
    delete config.headers["Content-Type"];
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  return await fetch(`/api${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      logout();
      // TODO: shoule we refresh the page for them or redirect to login page ???
      // window.location.assign(window.location);
      window.location.assign("/login");
      return Promise.reject({ message: "Please re-authenticate." });
    }

    const data = await response.json();

    if (response.ok) {
      if (
        customConfig.onSuccess &&
        typeof customConfig.onSuccess === "function"
      ) {
        customConfig.onSuccess();
      }

      if (customConfig.redirectTo) {
        window.location.assign(customConfig.redirectTo);
        return;
      }

      return Promise.resolve(data);
    } else {
      return Promise.reject(data);
    }
  });
}

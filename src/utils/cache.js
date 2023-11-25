export const STORAGE_ACCESS_KEY = "accessToken";
export const STORAGE_REFRESH_KEY = "refreshToken";
export const STORAGE_USER_KEY = "app.user";

export const getCachedUser = () => {
  return JSON.parse(window.localStorage.getItem(STORAGE_USER_KEY) || "{}");
};

export const getCachedAccessToken = () => {
  return window.localStorage.getItem(STORAGE_ACCESS_KEY);
};

export const getCachedRefreshToken = () => {
  return window.localStorage.getItem(STORAGE_REFRESH_KEY);
};

export const setCachedUser = (user) => {
    window.localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(user));
};

export const setCachedAccessToken = (accessToken) => {
  window.localStorage.setItem(STORAGE_ACCESS_KEY, accessToken);
};
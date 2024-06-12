export const getLocalStorege = (name = "data") => {
  let localStoregeData = localStorage.getItem(name);
  return localStoregeData !== null ? JSON.parse(localStoregeData) : false;
};
export const setLocalStorege = (name = "data", data = data) => {
  return localStorage.setItem(name, JSON.stringify(data));
};
export const getAuthToken = (name = "Token") => {
  let localStoregeData = localStorage.getItem(name);
  return localStoregeData !== null ? localStoregeData : false;
};
export const setAuthToken = (token, name = "Token") => {
  return localStorage.setItem(name, token);
};

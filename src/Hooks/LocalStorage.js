export const getLocalStorege = (name = "data") => {
  let localStoregeData = localStorage.getItem(name);
  return localStoregeData !== null ? JSON.parse(localStoregeData) : false;
};
export const setLocalStorege = (name = "data", data = data) => {
  return localStorage.setItem(name, JSON.stringify(data));
};

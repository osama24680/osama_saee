export const createLocalStore = (storageName, prevData, currentData) => {
  localStorage.setItem(storageName, JSON.stringify([...prevData, currentData]));
};

export const getStoreData = storageName => {
  return JSON.parse(localStorage.getItem(storageName)) || [];
};

import axios from "axios";

const JSON_HOST = "https://early-coconut-eggplant.glitch.me";

export const getJSON = async () => {
  const response = await axios.get(`${JSON_HOST}/expenses`);
  return response.data;
};

export const postJSON = async (history) => {
  const response = await axios.post(`${JSON_HOST}/expenses`, history);
  return response.data;
};

export const updateJSON = async ({ id, updatedData }) => {
  const response = await axios.put(`${JSON_HOST}/expenses/${id}`, updatedData);
  return response.data;
};

export const deleteJSON = async (id) => {
  const response = await axios.delete(`${JSON_HOST}/expenses/${id}`);
  return response.data;
};

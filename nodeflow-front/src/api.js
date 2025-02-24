import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/nodes";

export const getNodes = () => axios.get(API_URL);

export const createNode = (node) => axios.post(API_URL, node);

export const deleteNode = (id) => axios.delete(`${API_URL}/${id}`);

export const connectNodes = (sourceId, targetId) =>
  axios.post(`${API_URL}/${sourceId}/connect/${targetId}`);

export const disconnectNodes = (sourceId, targetId) =>
  axios.delete(`${API_URL}/${sourceId}/disconnect/${targetId}`);

import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  if (endpoint === '/customer/products') {
    data.forEach((product) => {
      product.quantity = 0;
    });
  }
  return data;
};

export const requestAllData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestListProduct = async (endpoint, body) => {
  const { data } = api.post(endpoint, body);
  return data;
};

export const validLogin = async (endpoint) => {
  const { data } = await api.post(endpoint);
  return data;
};

export const updateStatus = async (endpoint, body) => {
  const { data } = await api.patch(endpoint, body);
  return data;
};

export const requestLogin = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};
export const requestDelete = async (endpoint) => {
  const { data } = await api.delete(endpoint);
  return data;
};

export const requestSale = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export default api;

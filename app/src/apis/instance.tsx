import axios from 'axios';
import { ENDPOINT } from '../utils/ENDPOINT';
import getToken from '../utils/getToken';

const createInstance = () => {
  const TOKEN = getToken();
  return axios.create({
    baseURL: `${ENDPOINT}`,
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
  });
};

export const customAxios = axios.create({
  baseURL: `${ENDPOINT}`,
  headers: {
    accept: 'application/json',
    'api-key': 'mohae.com',
  },
  timeout: 10000,
});

const instance = createInstance();

export default instance;

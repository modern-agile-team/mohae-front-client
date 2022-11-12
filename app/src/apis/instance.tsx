import axios from 'axios';
import { ENDPOINT } from '../utils/ENDPOINT';
import getToken from '../utils/getToken';
import { ACCESS_TOKEN } from '../consts/tokenKey';

const createInstance = () => {
  const TOKEN = getToken(ACCESS_TOKEN);
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
    'api-key': 'mo-hae.com',
  },
  timeout: 10000,
});

const instance = createInstance();

export default instance;

import axios from 'axios';

const baseURL = 'https://notehub-api.goit.study';

export const serverApi = axios.create({
  baseURL,
  withCredentials: true,
}); 
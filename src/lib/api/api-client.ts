import axios from 'axios';

import { BASE_URL } from '@/constants/envs';

const ApiClient = axios.create({
  baseURL: BASE_URL,
});

export { ApiClient };

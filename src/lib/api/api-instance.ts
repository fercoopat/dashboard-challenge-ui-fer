import axios from 'axios';

import { ApiError, ApiResponse, RequestConfig } from '@/lib/api/api.types';
import { LOCALE_COOKIE_KEY } from '@/lib/constants/cookie.keys';
import StorageService from '@/lib/services/storage.service';

const apiInstance = axios.create({
  baseURL: '/api',
});

const requestHandler = (
  config: RequestConfig
): Promise<RequestConfig> | RequestConfig => {
  config.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...config?.headers,
  } as RequestConfig['headers'];

  const accessToken = config?.accessToken;

  if (accessToken && !config?.ignoreToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  const locale =
    config?.locale || StorageService.getCookie(LOCALE_COOKIE_KEY) || 'es';

  if (locale && !config.headers['Accept-Language']) {
    config.headers['Accept-Language'] = locale;
  }

  return config;
};

const responseHandler = (res: ApiResponse<unknown>): ApiResponse<unknown> => {
  return res;
};

const errorHandler = async (err: ApiError) => {
  if (err.status === 401) {
    return await apiInstance({});
  }
};

apiInstance.interceptors.request.use(requestHandler);
apiInstance.interceptors.response.use(responseHandler, errorHandler);

export default apiInstance;

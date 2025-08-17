import {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export type ApiResponse<T> = AxiosResponse<T>;

export type ApiError = {
  error: string;
  message: string;
  status: number;
  reference: string;
};

export type ApiConfig<T = unknown> = AxiosRequestConfig<T>;

export interface RequestConfig extends InternalAxiosRequestConfig {
  ignoreToken?: boolean;
  _retry?: boolean;
  locale?: string;
  accessToken?: string;
}

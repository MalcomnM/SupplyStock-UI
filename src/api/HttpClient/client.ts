import axios, { AxiosError, AxiosResponse } from 'axios';
import Interceptor, { IInterceptor } from './interceptor';
import AuthHandler, { IAuthHandler } from '../AuthHandler';
import qs from 'qs';

export interface IHttpClient {
  request<R>(
    method: string,
    url: string,
    data?: object,
    params?: object,
  ): Promise<AxiosResponse<R, AxiosError>>;
  get<R>(url: string, params?: object): Promise<AxiosResponse<R, AxiosError>>;
  post<R>(
    url: string,
    data: object,
    params?: object,
  ): Promise<AxiosResponse<R, AxiosError>>;
  put<R>(
    url: string,
    data: object,
    params?: object,
  ): Promise<AxiosResponse<R, AxiosError>>;
  delete<R>(url: string, data: object): Promise<AxiosResponse<R, AxiosError>>;
  patch<R>(
    url: string,
    data: object,
    params?: object,
  ): Promise<AxiosResponse<R, AxiosError>>;
}

export default class HttpClient implements IHttpClient {
  interceptor: IInterceptor;
  authHandler: IAuthHandler;
  baseUrl: string;

  constructor(baseUrl: string = '', version: string = 'v1') {
    this.baseUrl = `${baseUrl}/api/${version}`;
    this.interceptor = new Interceptor();
    this.authHandler = new AuthHandler();
  }

  serializedParams(params: any) {
    return qs.stringify(params, {
      arrayFormat: 'repeat', // This ensures that arrays are serialized without brackets
      encode: false, // Optional: Disable URL encoding if needed
    });
  }

  request<R>(
    method: string,
    url: string,
    data: object = {},
    params: object = {},
  ): Promise<AxiosResponse<R>> {
    return axios({
      method,
      url: `${this.baseUrl}${url}`,
      data,
      params,
      paramsSerializer: this.serializedParams,
    });
  }

  get<R>(
    url: string,
    params: object = {},
  ): Promise<AxiosResponse<R, AxiosError>> {
    return this.request<R>('get', url, {}, params);
  }

  post<R>(
    url: string,
    data: object,
    params?: object,
  ): Promise<AxiosResponse<R, AxiosError>> {
    return this.request<R>('post', url, data, params);
  }

  put<R>(
    url: string,
    data: object,
    params?: object,
  ): Promise<AxiosResponse<R, AxiosError>> {
    return this.request<R>('put', url, data, params);
  }

  delete<R>(url: string, data?: object): Promise<AxiosResponse<R, AxiosError>> {
    return this.request<R>('delete', url, data);
  }

  patch<R>(
    url: string,
    data: object,
    params?: object,
  ): Promise<AxiosResponse<R, AxiosError>> {
    return this.request<R>('patch', url, data, params);
  }
}

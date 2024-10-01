import axios, { AxiosError, AxiosResponse } from 'axios';

export interface IInterceptor {
  handleSuccess(response: AxiosResponse): AxiosResponse;
  handleError(error: AxiosError): void;
}

export default class Interceptor implements IInterceptor {
  constructor() {
    axios.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess(response: AxiosResponse): AxiosResponse {
    //  console.log("Request: \n", `${response?.config?.method.toUpperCase()}:`, response?.config?.url, "\n", "response:", response);
    return response;
  }

  handleError(error: AxiosError): Promise<AxiosError> {
    throw error;
  }
}

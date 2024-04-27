import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { ApiResponse, Apitypes, ResponseMeta } from 'types';
import { getToken } from 'utils/authentication';

type FetchConfig = AxiosRequestConfig & {
  useAuthorizationHeader?: boolean;
  absoluteUrl?: string;
  rawResponse?: boolean;
};

class Api {
  apiUrl = process.env.REACT_APP_API_URL;

  token: string | null;

  language: string = process.env.REACT_APP_DEFAULT_LANGUAGE ?? 'tr-TR';

  constructor() {
    this.token = getToken();
  }

  async fetch<T>({
    url,
    absoluteUrl,
    method = Apitypes.GET,
    data,
    headers,
    useAuthorizationHeader,
    rawResponse,
    ...restConfig
  }: FetchConfig): ApiResponse<T> {
    let extendedHeaders: AxiosRequestHeaders = {
      'Content-Language': this.language,
    };

    if (useAuthorizationHeader) {
      if (this.token) {
        extendedHeaders.authorization = `Bearer ${this.token}`;
      }
    }

    if (headers) {
      extendedHeaders = { ...extendedHeaders, ...headers };
    }

    url = absoluteUrl ?? `${this.apiUrl}/${url}`;

    const config: AxiosRequestConfig = {
      url,
      method,
      data,
      headers: extendedHeaders,
      ...restConfig,
    };

    let res: AxiosResponse;

    if (method?.toLowerCase() === 'post') {
      res = await axios.post(url, data, {
        headers: extendedHeaders,
        ...restConfig,
      });
    } else if (method?.toLowerCase() === 'put') {
      res = await axios.put(url, data, {
        headers: extendedHeaders,
        ...restConfig,
      });
    } else {
      res = await axios(config);
    }

    if (rawResponse === true) {
      return res;
    }

    const { meta, data: resData }: { data: T; meta: ResponseMeta } = res.data;

    if (meta.status >= 400) {
      throw new Error(meta.message);
    }

    return { data: resData, meta };
  }
}

export default new Api();

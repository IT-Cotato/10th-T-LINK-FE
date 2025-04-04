import instance from '../api/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';

const getAPIResponseData = async <T, D = T>(option: AxiosRequestConfig<D>) => {
  try {
    const { data } = await instance<T>(option);
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      const method = option.method?.toUpperCase();

      // 공통
      if (e.response?.status === 500) {
        localStorage.clear();
        window.location.href = '/';
        return;
      }

      // POST - 토스트 띄우기
      if (method === 'POST') {
      }

      // GET - 에러 페이지 띄우기
      if (method === 'GET') {
      }
    }

    throw e;
  }
};

export default getAPIResponseData;

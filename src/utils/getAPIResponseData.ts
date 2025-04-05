import instance from '../api/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';

const getAPIResponseData = async <T, D = T>(option: AxiosRequestConfig<D>): Promise<T> => {
  try {
    const { data } = await instance(option);

    // 만약 data 내부에 data가 있으면 자동으로 한 단계 제거
    if (data && typeof data === 'object' && 'data' in data) {
      return data.data as T;
    }

    return data as T;
  } catch (e) {
    if (e instanceof AxiosError) {
      const method = option.method?.toUpperCase();

      // 공통
      if (e.response?.status === 500) {
        localStorage.clear();
        window.location.href = '/';
        return Promise.reject(e);
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

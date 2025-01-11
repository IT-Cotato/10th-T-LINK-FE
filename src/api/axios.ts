import axios, { AxiosInstance } from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    // 요청이 전달되기 전에 헤더에 토큰 추가
    // 추후에 바꿔도 될 듯 => 상의 필요
    const accesstoken = localStorage.getItem('accesstoken');
    if (accesstoken) {
      config.headers.Authorization = `Bearer ${accesstoken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // 토큰 만료 시
    const msg = error.response.data.msg; // 백엔드에서 토큰 만료됐다고 알려주는 msg("Expired Access Token")
    if (error.response.status === 401 && msg === 'Expired Access Token') {
      try {
        const res = await axios.post(
          '/백에서 주는 url',
          {},
          {
            headers: {
              accessToken: `${localStorage.getItem('accessToken')}`,
              refreshToken: `${localStorage.getItem('refreshToken')}`,
            },
          },
        );
        localStorage.setItem('accessToken', res.headers.accessToken);
        localStorage.setItem('refreshToken', res.headers.refreshToken);

        error.config.headers.Authorization = `Bearer ${res.headers.accessToken}`;
        return axios(error.config);
      } catch (refreshErr) {
        console.log(refreshErr);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default instance;

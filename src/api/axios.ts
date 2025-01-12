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
    // 요청이 전달되기 전 헤더에 토큰 추가
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
    const refreshToken = localStorage.getItem('refreshToken');
    if (error.response.status === 401 && msg === 'Expired Access Token') {
      try {
        if (refreshToken) {
          const res = await axios.post(
            '/백에서 주는 url',
            { refreshToken },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          localStorage.setItem('accessToken', res.headers.accessToken);

          error.config.headers.Authorization = `Bearer ${res.headers.accessToken}`;
          return axios(error.config);
        }
      } catch (refreshErr) {
        console.log('Token 갱신 실패: ', refreshErr);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default instance;

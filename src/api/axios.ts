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
    const roleInfo = localStorage.getItem('roleInfo');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (roleInfo) {
      config.headers.RoleInfo = roleInfo;
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
    const msg = error.response.data.message; // 백엔드에서 토큰 만료됐다고 알려주는 msg
    const refreshToken = localStorage.getItem('refreshToken');
    if (error.response.status === 401 && msg === '사용자의 로그인 검증을 실패했습니다.') {
      try {
        if (refreshToken) {
          const res = await axios.post(
            '/api/auth/kakao/token',
            { refreshToken },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          localStorage.setItem('accessToken', res.headers.Authorization); // 백에서 header/body 중 어디로 주는 지 확인 후 수정

          // 새 토큰으로 헤더 업데이트 후 재요청
          error.config.headers.Authorization = `Bearer ${res.headers.Authorization}`;
          return axios(error.config);
        }
      } catch (refreshErr) {
        console.log('Token 갱신 실패: ', refreshErr);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('roleInfo');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export default instance;

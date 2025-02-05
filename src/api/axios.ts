import axios, { AxiosInstance } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';

const baseURL = import.meta.env.VITE_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
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
  // status가 2xx-> 그럼 다른 코드에서 굳이 코드가 200인지 확인 안해도 되나?
  (response) => {
    return response;
  },
  async (error) => {
    // 토큰 만료 시
    const msg = error.response.data.message; // 백엔드에서 토큰 만료됐다고 알려주는 msg
    const refreshToken = localStorage.getItem('refreshToken');
    if (error.response.status === 401) {
      try {
        if (refreshToken) {
          const res = await axios.post(
            '/api/auth/kakao/reissue',
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          );
          if (res.status == 200) {
            localStorage.setItem('accessToken', res.data.accessToken);
            localStorage.setItem('refreshToken', res.data.refreshToken);

            const decoded = jwtDecode(res.data.accessToken) as JwtPayload & { role: string };
            localStorage.setItem('roleInfo', decoded.role);
          }
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

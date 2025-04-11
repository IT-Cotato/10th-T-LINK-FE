import axios, { AxiosInstance } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import toast from 'react-hot-toast';

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
  (response) => response,
  async (error) => {
    const status = error.response.status;
    const method = error.config.method.toUpperCase();
    const refreshToken = localStorage.getItem('refreshToken');

    // 기존 토큰 재발급 코드
    if (status === 401 && refreshToken) {
      try {
        const res = await axios.post(
          `${baseURL}/api/auth/kakao/reissue`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        if (res.status === 200) {
          const { accessToken, refreshToken } = res.data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);

          const decoded = jwtDecode(accessToken) as JwtPayload & { role: string };
          localStorage.setItem('roleInfo', decoded.role);
          console.log('🔁 토큰 재발급 성공');

          // 요청 재시도
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(error.config);
        }
      } catch (refreshErr) {
        console.log('🚫 토큰 재발급 실패:', refreshErr);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      }
    }

    // 에러 처리 코드
    const statusMessages: Record<number, string> = {
      400: '잘못된 요청입니다.',
      403: '접근 권한이 없습니다.',
      404: '요청하신 데이터를 찾을 수 없습니다.',
      413: '파일의 용량이 너무 큽니다.',
      500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
    };

    const message = statusMessages[status] || '알 수 없는 오류가 발생했습니다.';

    if (method === 'GET') {
      window.dispatchEvent(
        new CustomEvent('triggerErrorUI', {
          detail: { status, message },
        }),
      );
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  },
);

export default instance;

import { UserCode } from '../models/user.model';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

// 카카오 로그인 인가코드 보내기
export const postAuthCode = async (code: UserCode) => {
  try {
    const res = await axios.post(`${baseURL}/api/auth/kakao/login`, code, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (e) {
    throw e;
  }
};

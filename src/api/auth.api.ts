import { UserInfo, UserCode } from '../models/user.model';
import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

// 카카오 로그인 인가코드 보내기
export const postAuthCode = async (code: UserCode) => {
  const res = await axios.post(`${baseURL}/api/auth/kakao/login`, code, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res;
};

// 회원가입 시 입력한 정보 보내기
export const postUserInfo = async (userInfo: UserInfo) => {
  const accessToken = localStorage.getItem('accessToken');

  const res = await axios.post(`${baseURL}/api/auth/kakao/onboard`, userInfo, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return res;
};

// 로그아웃
export const postLogout = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const res = await axios.post(
    `${baseURL}/api/auth/kakao/logout`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return res;
};

// 탈퇴
export const deleteUser = async () => {
  const accessToken = localStorage.getItem('accessToken');

  const res = await axios.delete(`${baseURL}/api/v1/user`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res;
};

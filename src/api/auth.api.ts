import instance from './axios';
import { UserInfo } from '../models/user.model';

// 카카오 로그인 인가코드 보내기
export const postAuthCode = async (code: string) => {
  const res = await instance.post('/api/auth/kakao/signin', code);
  return res.data;
};

//회원가입 시 입력한 정보 보내기
export const postUserInfo = async (userInfo: UserInfo) => {
  const res = await instance.post('/api/v1/user', userInfo);
  return res.status;
};

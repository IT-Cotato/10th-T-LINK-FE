import instance from './axios';

interface UserInfo {
  role: string;
  username: string;
  phoneNumber: string;
  birthday: string;
}

export const postAuthCode = async (code: string) => {
  const res = await instance.post('/api/auth/kakao/signin', code);
  return res.data;
};

export const postUserInfo = async (userInfo: UserInfo) => {
  const res = await instance.post('/api/v1/user', userInfo);
  return res.data;
};

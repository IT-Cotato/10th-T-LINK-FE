import instance from './axios';

// 유저 정보
export const getUserInfo = async () => {
  const response = await instance.get(`/api/v1/user/mypage`);
  return response;
};

export const patchMessage = async (statusMessage: string) => {
  const repsonse = await instance.patch(`/api/v1/user/mypage/statusMessage`, { statusMessage });
  return repsonse;
};

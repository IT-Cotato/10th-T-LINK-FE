import instance from './axios';

// 유저 정보
export const getUserInfo = async () => {
  try {
    const response = await instance.get(`/api/v1/user/mypage`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const patchMessage = async () => {
  try {
    const repsonse = await instance.patch(`/api/v1/user/mypage/statusMessage`);
    return repsonse;
  } catch (error) {
    console.log(error);
  }
};

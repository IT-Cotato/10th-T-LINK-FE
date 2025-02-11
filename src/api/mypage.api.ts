import instance from './axios';

// 숙제 목록 조회
export const getUserInfo = async () => {
  try {
    const response = await instance.get(`/api/v1/user/mypage`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

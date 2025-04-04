import getAPIResponseData from '../utils/getAPIResponseData';

// 유저 정보 조회
export const getUserInfo = async () => {
  return await getAPIResponseData({
    url: '/api/v1/user/mypage',
    method: 'GET',
  });
};

// 상태 메시지 수정
export const patchMessage = async (statusMessage: string) => {
  return await getAPIResponseData({
    url: '/api/v1/user/mypage/statusMessage',
    method: 'PATCH',
    data: { statusMessage },
  });
};

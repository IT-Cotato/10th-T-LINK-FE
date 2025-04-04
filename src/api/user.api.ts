import { UserInfo } from '../models/user.model';
import getAPIResponseData from '../utils/getAPIResponseData';

// 회원가입 시 입력한 정보 보내기
export const postUserInfo = async (userInfo: UserInfo) => {
  return await getAPIResponseData({
    url: `/api/auth/kakao/onboard`,
    method: 'POST',
    data: userInfo,
  });
};

// 로그아웃
export const postLogout = async () => {
  return await getAPIResponseData({
    url: `/api/auth/kakao/logout`,
    method: 'POST',
    data: {},
  });
};

// 탈퇴
export const deleteUser = async () => {
  return await getAPIResponseData({
    url: `/api/v1/user`,
    method: 'DELETE',
  });
};

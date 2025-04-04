import getAPIResponseData from '../utils/getAPIResponseData';

// 캘린더 정보 조회
export const getCalendar = async () => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/info`,
    method: 'GET',
  });
};

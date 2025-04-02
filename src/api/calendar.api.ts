import instance from './axios';

// 캘린더 정보 조회
export const getCalendar = async () => {
  const res = await instance.get(`/api/v1/rooms/info`);
  return res.data;
};

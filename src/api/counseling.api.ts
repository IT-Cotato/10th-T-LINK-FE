import instance from './axios';

// 상담 일지 목록 조회
export const getCounselingLogs = async (roomId: string) => {
  const response = await instance.get(`/api/v1/rooms/${roomId}/counselingLogs`);
  return response.data;
};

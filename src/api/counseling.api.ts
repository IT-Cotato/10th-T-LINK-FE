import { CounselingInfo } from '../models/counseling.model';
import getAPIResponseData from '../utils/getAPIResponseData';

// 상담 일지 목록 조회
export const getCounselingLogs = async (roomId: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/counselingLogs`,
    method: 'GET',
  });
};

// 상담 일지 업로드
export const postCounselingLogs = async (roomId: string, payload: CounselingInfo) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/counselingLogs`,
    method: 'POST',
    data: payload,
  });
};

// 상담 일지 상세 조회
export const getCounselingLogDetail = async (roomId: string, counselingLogId: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/counselingLogs/${counselingLogId}`,
    method: 'GET',
  });
};

// 상담 일지 삭제
export const deleteCounselingLog = async (roomId: string, counselingLogId: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/counselingLogs/${counselingLogId}`,
    method: 'DELETE',
  });
};

// 상담 일지 수정
export const patchCounselingLog = async (
  roomId: string,
  counselingLogId: string,
  payload: CounselingInfo,
) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/counselingLogs/${counselingLogId}`,
    method: 'PUT',
    data: payload,
  });
};

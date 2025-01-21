import { CounselingInfo } from '../models/counseling.model';
import instance from './axios';

// 상담 일지 목록 조회
export const getCounselingLogs = async (roomId: string) => {
  const response = await instance.get(`/api/v1/rooms/${roomId}/counselingLogs`);
  return response.data;
};

// 상담 일지 업로드
export const postCounselingLogs = async (roomId: string, payload: CounselingInfo) => {
  const response = await instance.post(`/api/v1/rooms/${roomId}/counselingLogs`, payload);
  return response.data;
};

// 상담 일지 상세 조회
export const getCounselingLogDetail = async (roomId: string, counselingLogId: string) => {
  const response = await instance.get(`/api/v1/rooms/${roomId}/counselingLogs/${counselingLogId}`);
  return response.data;
};

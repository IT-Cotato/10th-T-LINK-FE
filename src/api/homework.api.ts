import { HomeworkInfo, HomeworkUpdateRequest } from '../models/homework.model';
import { createHomeworkFormData, createUpdateHomeworkFormData } from '../utils/formDataUtils';
import getAPIResponseData from '../utils/getAPIResponseData';

// 숙제 생성
export const uploadHomework = async (roomId: string, payload: HomeworkInfo) => {
  const formData = createHomeworkFormData(payload);
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/homeworks`,
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 숙제 목록 조회
export const getHomework = async (roomId: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/homeworks`,
    method: 'GET',
  });
};

// 숙제 상세 조회
export const getHomeworkDeatil = async (roomId: string, homeworkId: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/homeworks/${homeworkId}`,
    method: 'GET',
  });
};

// 숙제 삭제
export const deleteHomework = async (roomId: string, homeworkId: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/homeworks/${homeworkId}`,
    method: 'DELETE',
  });
};

// 숙제 수정
export const patchHomework = async (
  roomId: string,
  homeworkId: string,
  payload: HomeworkUpdateRequest,
) => {
  const formData = createUpdateHomeworkFormData(payload);
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/homeworks/${homeworkId}`,
    method: 'PATCH',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 숙제 수정을 위한 상세 조회
export const getHomeworkInfo = async (roomId: string, homeworkId: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/homeworks/${homeworkId}/info`,
    method: 'GET',
  });
};

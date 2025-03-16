import instance from './axios';
import { HomeworkInfo, HomeworkUpdateRequest } from '../models/homework.model';
import { createHomeworkFormData, createUpdateHomeworkFormData } from '../utils/formDataUtils';

// 숙제 생성
export const uploadHomework = async (roomId: string, payload: HomeworkInfo) => {
  try {
    const formData = createHomeworkFormData(payload);
    const response = await instance.post(`/api/v1/rooms/${roomId}/homeworks`, formData);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 숙제 목록 조회
export const getHomework = async (roomId: string) => {
  try {
    const response = await instance.get(`/api/v1/rooms/${roomId}/homeworks`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 숙제 상세 조회
export const getHomeworkDeatil = async (roomId: string, homeworkId: string) => {
  try {
    const response = await instance.get(`/api/v1/rooms/${roomId}/homeworks/${homeworkId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 숙제 삭제
export const deleteHomework = async (roomId: string, homeworkId: string) => {
  const response = await instance.delete(`/api/v1/rooms/${roomId}/homeworks/${homeworkId}`);
  return response.data;
};

// 숙제 수정
export const patchHomework = async (
  roomId: string,
  homeworkId: string,
  payload: HomeworkUpdateRequest,
) => {
  const formData = createUpdateHomeworkFormData(payload);
  const response = await instance.patch(
    `/api/v1/rooms/${roomId}/homeworks/${homeworkId}`,
    formData,
  );
  return response.data;
};

// 숙제 생성을 위한 상세 조회
export const getHomeworkInfo = async (roomId: string, homeworkId: string) => {
  const response = await instance.get(`/api/v1/rooms/${roomId}/homeworks/${homeworkId}/info`);
  return response.data;
};

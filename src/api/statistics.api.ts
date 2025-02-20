import { GradeType } from '../components/Modal/CreateModal';
import instance from './axios';

// 시험 종류 조회
export const getExamType = async (roomId: string) => {
  try {
    const response = await instance.get(`/api/v1/rooms/${roomId}/gradeStatistics`);
    if (response.status == 200) return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 시험 성적 조회
export const getGrade = async (roomId: string, examBoxId: string) => {
  try {
    const response = await instance.get(`/api/v1/rooms/${roomId}/gradeStatistics/${examBoxId}`);
    if (response.status == 200) return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 시험 추가
export const postTest = async (roomId: string, examBoxName: string) => {
  try {
    const response = await instance.post(`/api/v1/rooms/${roomId}/gradeStatistics`, { examBoxName });
    if (response.status == 200) return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 성적 추가
export const postGrade = async (roomId: string, examBoxId: string, payload: GradeType) => {
  try {
    const response = await instance.post(`/api/v1/rooms/${roomId}/gradeStatistics/${examBoxId}`, payload);
    if (response.status == 200) return response.data;
  } catch (error) {
    console.log(error);
  }
};

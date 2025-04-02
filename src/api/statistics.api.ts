import { GradeType } from '../components/Modal/CreateModal';
import instance from './axios';

// 시험 종류 조회
export const getExamType = async (roomId: string) => {
  const response = await instance.get(`/api/v1/rooms/${roomId}/gradeStatistics`);
  return response.data;
};

// 시험 성적 조회
export const getGrade = async (roomId: string, examBoxId: string) => {
  const response = await instance.get(`/api/v1/rooms/${roomId}/gradeStatistics/${examBoxId}`);
  return response.data;
};

// 시험 추가
export const postTest = async (roomId: string, examBoxName: string) => {
  const response = await instance.post(`/api/v1/rooms/${roomId}/gradeStatistics`, {
    examBoxName,
  });
  return response.data;
};

// 성적 추가
export const postGrade = async (roomId: string, examBoxId: string, payload: GradeType) => {
  const response = await instance.post(
    `/api/v1/rooms/${roomId}/gradeStatistics/${examBoxId}`,
    payload,
  );
  return response.data;
};

// 시험 삭제
export const deleteTest = async (roomId: string, examBoxId: number) => {
  const response = await instance.delete(`/api/v1/rooms/${roomId}/gradeStatistics/${examBoxId}`);
  return response.data;
};

// 성적 삭제
export const deleteGrade = async (roomId: string, examBoxId: number, examId: number) => {
  const response = await instance.delete(
    `/api/v1/rooms/${roomId}/gradeStatistics/${examBoxId}/exams/${examId}`,
  );
  return response.data;
};

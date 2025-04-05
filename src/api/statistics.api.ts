import { GradeType } from '../components/Modal/CreateModal';
import { Exam, Grade } from '../models/statistics.model';
import getAPIResponseData from '../utils/getAPIResponseData';

// 시험 종류 조회
export const getExamType = async (roomId: string) => {
  return await getAPIResponseData<{ examBox: Exam[] }>({
    url: `/api/v1/rooms/${roomId}/gradeStatistics`,
    method: 'GET',
  });
};

// 시험 성적 조회
export const getGrade = async (roomId: string, examBoxId: string) => {
  return await getAPIResponseData<{ exams: Grade[] }>({
    url: `/api/v1/rooms/${roomId}/gradeStatistics/${examBoxId}`,
    method: 'GET',
  });
};

// 시험 추가
export const postTest = async (roomId: string, examBoxName: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/gradeStatistics`,
    method: 'POST',
    data: { examBoxName },
  });
};

// 성적 추가
export const postGrade = async (roomId: string, examBoxId: string, payload: GradeType) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/gradeStatistics/${examBoxId}`,
    method: 'POST',
    data: payload,
  });
};

// 시험 삭제
export const deleteTest = async (roomId: string, examBoxId: number) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/gradeStatistics/${examBoxId}`,
    method: 'DELETE',
  });
};

// 성적 삭제
export const deleteGrade = async (roomId: string, examBoxId: number, examId: number) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/gradeStatistics/${examBoxId}/exams/${examId}`,
    method: 'DELETE',
  });
};

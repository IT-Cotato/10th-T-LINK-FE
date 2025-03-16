import instance from '../api/axios';
import {
  LectureFileBoxDetail,
  SimpleLectureFileBox,
  UpdateLectureFileBox,
} from '../models/materials.model';
import { createMaterialFormData, createUpdateMaterialFormData } from '../utils/formDataUtils';

// 강의 자료함 생성
export const uploadLectureFile = async (roomId: string, payload: SimpleLectureFileBox) => {
  try {
    const formData = createMaterialFormData(payload);
    const response = await instance.post(`/api/v1/rooms/${roomId}/lectureFileBoxes`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 강의 자료 목록 조회
export const getLectureFileBoxes = async (roomId: string) => {
  const response = await instance.get(`/api/v1/rooms/${roomId}/lectureFileBoxes`);
  return response.data;
};

// 강의 자료 상세 조회
export const getLectureFileDeatil = async (roomId: string, lectureFileBoxId: string) => {
  const response = await instance.get(
    `/api/v1/rooms/${roomId}/lectureFileBoxes/${lectureFileBoxId}`,
  );
  return response.data;
};

// 강의 자료 삭제
export const deleteLectureFile = async (roomId: string, lectureFileBoxId: string) => {
  const response = await instance.delete(
    `/api/v1/rooms/${roomId}/lectureFileBoxes/${lectureFileBoxId}`,
  );
  return response.data;
};

// 강의 자료 수정
export const patchLectureFile = async (
  roomId: string,
  lectureFileBoxId: string,
  payload: UpdateLectureFileBox,
) => {
  const formData = createUpdateMaterialFormData(payload);
  const response = await instance.patch(
    `/api/v1/rooms/${roomId}/lectureFileBoxes/${lectureFileBoxId}`,
    formData,
  );
  return response.data;
};

// 강의 자료 파일 전체 다운로드
export const getAllLectureFile = async (roomId: string, lectureFileBoxId: number) => {
  const response = await instance.get(
    `/api/v1/rooms/${roomId}/lectureFileBoxes/${lectureFileBoxId}/download`,
  );
  return response.data;
};

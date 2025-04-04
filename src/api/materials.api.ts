import {
  LectureFile,
  LectureFileBox,
  LectureFileBoxDetail,
  SimpleLectureFileBox,
  UpdateLectureFileBox,
} from '../models/materials.model';
import { createMaterialFormData, createUpdateMaterialFormData } from '../utils/formDataUtils';
import getAPIResponseData from '../utils/getAPIResponseData';

// 강의 자료함 생성
export const uploadLectureFile = async (roomId: string, payload: SimpleLectureFileBox) => {
  const formData = createMaterialFormData(payload);
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/lectureFileBoxes`,
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 강의 자료 목록 조회
export const getLectureFileBoxes = async (roomId: string) => {
  return await getAPIResponseData<{ lectureFileBoxes: LectureFileBox[] }>({
    url: `/api/v1/rooms/${roomId}/lectureFileBoxes`,
    method: 'GET',
  });
};

// 강의 자료 상세 조회
export const getLectureFileDeatil = async (roomId: string, lectureFileBoxId: string) => {
  return await getAPIResponseData<LectureFileBoxDetail>({
    url: `/api/v1/rooms/${roomId}/lectureFileBoxes/${lectureFileBoxId}`,
    method: 'GET',
  });
};

// 강의 자료 삭제
export const deleteLectureFile = async (roomId: string, lectureFileBoxId: string) => {
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/lectureFileBoxes/${lectureFileBoxId}`,
    method: 'DELETE',
  });
};

// 강의 자료 수정
export const patchLectureFile = async (
  roomId: string,
  lectureFileBoxId: string,
  payload: UpdateLectureFileBox,
) => {
  const formData = createUpdateMaterialFormData(payload);
  return await getAPIResponseData({
    url: `/api/v1/rooms/${roomId}/lectureFileBoxes/${lectureFileBoxId}`,
    method: 'PATCH',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// 강의 자료 파일 전체 다운로드
export const getAllLectureFile = async (roomId: string, lectureFileBoxId: number) => {
  return await getAPIResponseData<{ fileUrls: string[] }>({
    url: `/api/v1/rooms/${roomId}/lectureFileBoxes/${lectureFileBoxId}/download`,
    method: 'GET',
  });
};

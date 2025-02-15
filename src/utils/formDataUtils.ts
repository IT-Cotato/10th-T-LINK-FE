import { HomeworkInfo, HomeworkUpdateRequest } from '../models/homework.model';
import { SimpleLectureFileBox, UpdateLectureFileBox } from '../models/materials.model';

// 숙제 업로드 formData 생성
export const createHomeworkFormData = (homework: HomeworkInfo): FormData => {
  const formData = new FormData();

  homework.homeworkFiles.forEach((file) => {
    formData.append('homeworkFiles', file);
  });

  formData.append('homeworkName', homework.homeworkName);
  formData.append('deadline', homework.deadline);

  return formData;
};

// 강의 자료함 업로드 formData 생성
export const createMaterialFormData = (materials: SimpleLectureFileBox): FormData => {
  const formData = new FormData();

  materials.lectureFiles.forEach((file) => {
    if (file) {
      formData.append('lectureFiles', file);
    }
  });

  formData.append('lectureFileBoxName', materials.lectureFileBoxName!);

  return formData;
};

// 강의 자료함 수정 formData 생성
export const createUpdateMaterialFormData = (materials: UpdateLectureFileBox): FormData => {
  const formData = new FormData();

  materials.addLectureFiles.forEach((file) => {
    if (file) {
      formData.append('addLectureFiles', file);
    }
  });

  materials.removeLectureFiles.forEach((file) => {
    formData.append('removeLectureFiles', JSON.stringify(file));
  });

  formData.append('lectureFileBoxName', materials.lectureFileBoxName);

  return formData;
};

// 숙제 수정 FormData 생성
export const createUpdateHomeworkFormData = (data: HomeworkUpdateRequest): FormData => {
  const formData = new FormData();

  formData.append('deadline', data.deadline);

  data.addHomeworkFiles.forEach((file) => {
    formData.append('addHomeworkFiles', file);
  });

  data.removeHomeworkFiles.forEach((file) => {
    formData.append('removeHomeworkFiles', JSON.stringify(file));
  });

  // 숙제 이름은 선택적
  if (data.homeworkName) {
    formData.append('homeworkName', data.homeworkName);
  }

  return formData;
};

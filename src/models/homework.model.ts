// 숙제 업로드 시 사용
export interface HomeworkInfo {
  homeworkName: string;
  deadline: string;
  homeworkFiles: File[];
}

// 숙제 목록 조회 시 사용
export interface Homeworks {
  homeworkId: number;
  createdAt: string;
  homeworkName: string;
  deadline: string;
  passed: boolean; // 마감일 지났는지
}

// 상세 조회에서 반환되는 데이터
export interface LectureFileBoxDetail {
  homeworkId: number;
  homeworkName: string;
  teacherFiles: HomeworkFile[];
  studentFiles: HomeworkFile[];
}

export interface HomeworkFile {
  homeworkFileId?: number; // 선생님 파일에만 존재
  originalName: string;
  fileUrl: string;
}

// 숙제 수정
export interface HomeworkUpdateRequest {
  deadline: string;
  homeworkName?: string; // 선생님만 전달
  addHomeworkFiles: File[];
  removeHomeworkFiles: { homeworkFileId: number }[];
}

// 강의 자료 업로드 시 사용
export interface SimpleLectureFileBox {
  lectureFileBoxName: string;
  lectureFiles: File[]; // 업로드 시 파일이 반드시 필요
}

// 강의 자료 목록 조회 시 사용
export interface LectureFileBox {
  lectureFileBoxName: string;
  lectureFileBoxId: number;
  updatedAt: string;
}

// 상세 조회에서 반환되는 데이터
export interface LectureFileBoxDetail {
  lectureFileBoxId: number;
  lectureFileBoxName: string;
  lectureFiles: LectureFile[];
}

export interface LectureFile {
  lectureFileId: number;
  originalName: string;
  filePath: string;
}

// 수정 요청에 사용되는 데이터
export interface UpdateLectureFileBox {
  lectureFileBoxName: string;
  addLectureFiles: File[];
  removeLectureFiles: RemoveLectureFile[];
}

// 삭제할 파일 정보
export interface RemoveLectureFile {
  lectureFileId: number;
}

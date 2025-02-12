// 상담일지 목록 조회 시 사용
export interface CounselingLogs {
  id: number;
  title: string;
  updatedAt: string;
}

// 상담일지 업로드 && 수정
export interface CounselingInfo {
  title: string;
  content: string;
  engagement: string;
  homeworkSubmitted: boolean | null;
}

// 상담일지 상세 조회
export interface CounselingLogDetail {
  counselingLogId: number;
  title: string;
  content: string;
  engagement: string;
  homeworkSubmitted: boolean | null;
  updatedAt: string;
}

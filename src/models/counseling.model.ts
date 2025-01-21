// 상담일지 목록 조회 시 사용
export interface CounselingLogs {
  counselingLogId: number;
  title: string;
  updatedAt: string;
}

// 상담일지 업로드
export interface CounselingInfo {
  title: string;
  content: string;
  engagement: 'upper' | 'middle' | 'lower';
  homeworkSubmitted?: boolean;
}

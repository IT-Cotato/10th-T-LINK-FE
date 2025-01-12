export interface Permission {
  id: number;
  type: string;
  title: string;
}

export const ParentPermissions: Permission[] = [
  { id: 0, type: 'materials', title: '강의 자료함' },
  { id: 1, type: 'homework', title: '주차별 숙제' },
  { id: 2, type: 'stats', title: '성적 통계' },
  { id: 3, type: 'counseling', title: '상담 일지' }, //true
  { id: 4, type: 'payment', title: '입금' }, //true
];

export const StudentPermissions: Permission[] = [
  { id: 5, type: 'materials', title: '강의 자료함' }, //true
  { id: 6, type: 'homework', title: '주차별 숙제' }, //true
  { id: 7, type: 'stats', title: '성적 통계' }, //true
  { id: 8, type: 'counseling', title: '상담 일지' },
  { id: 9, type: 'payment', title: '입금' },
];

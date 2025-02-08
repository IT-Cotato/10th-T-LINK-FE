import { Permission } from '../models/room.model';

export const StudentPermission: Permission[] = [
  { id: 0, type: 'lecture_file', title: '강의 자료함' }, //true
  { id: 1, type: 'homework', title: '주차별 숙제' }, //true
  { id: 2, type: 'gradeStatistic', title: '성적 통계' }, //true
  { id: 3, type: 'counselingLog', title: '상담 일지' },
  { id: 4, type: 'deposit', title: '입금' },
];

export const ParentPermission: Permission[] = [
  { id: 5, type: 'lecture_file', title: '강의 자료함' },
  { id: 6, type: 'homework', title: '주차별 숙제' },
  { id: 7, type: 'gradeStatistic', title: '성적 통계' },
  { id: 8, type: 'counselingLog', title: '상담 일지' }, //true
  { id: 9, type: 'deposit', title: '입금' }, //true
];

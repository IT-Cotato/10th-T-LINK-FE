import boy from '../assets/images/student_boy.png';
import mom from '../assets/images/parent_mom.png';
import teacher from '../assets/images/teacher_woman.png';

export interface Role {
  id: number;
  title: string;
  description: string;
  src: string;
  role: 'STUDENT' | 'TEACHER' | 'PARENT';
}

export const RoleList: Role[] = [
  {
    id: 0,
    title: '학생',
    description: '선생님과 소통하고 과제를 제출해요.',
    src: boy,
    role: 'STUDENT',
  },
  {
    id: 1,
    title: '선생님',
    description: '학생, 학부모와 소통하고 수업해요.',
    src: teacher,
    role: 'TEACHER',
  },
  {
    id: 2,
    title: '부모',
    description: '선생님과 소통하고 입금해요.',
    src: mom,
    role: 'PARENT',
  },
];

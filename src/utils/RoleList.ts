import boy from '../assets/images/boy.png';
import mom from '../assets/images/mom.png';
import teacher from '../assets/images/teacher.png';

export interface Role {
  id: number;
  title: string;
  description: string;
  src: string;
  role: 'student' | 'teacher' | 'parent';
}

export const RoleList: Role[] = [
  {
    id: 0,
    title: '학생',
    description: '선생님과 소통하고 과제를 제출해요.',
    src: boy,
    role: 'student',
  },
  {
    id: 1,
    title: '선생님',
    description: '학생, 학부모와 소통하고 수업해요.',
    src: teacher,
    role: 'teacher',
  },
  {
    id: 2,
    title: '학부모',
    description: '선생님과 소통하고 입금해요.',
    src: mom,
    role: 'parent',
  },
];

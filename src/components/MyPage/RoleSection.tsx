import teacher from '../../assets/images/teacher_woman.png';
import student from '../../assets/images/student_boy.png';
import mom from '../../assets/images/parent_mom.png';
import { MyPageUserInfo, UserInfo } from '../../models/user.model';

const roleCard = [
  {
    role: 'TEACHER',
    name: '선생님',
    ment: '오늘도 화이팅하세요!',
    image: <img src={teacher} className="w-6 h-6" />,
  },
  {
    role: 'STUDENT',
    name: '학생',
    ment: '오늘도 열공하세요!',
    image: <img src={student} className="w-6 h-6" />,
  },
  {
    role: 'PARENT',
    name: '학부모',
    ment: '오늘도 행복하세요!',
    image: <img src={mom} className="w-6 h-6" />,
  },
];

interface RoleSectionProps {
  userInfo: MyPageUserInfo;
}
const RoleSection = ({ userInfo }: RoleSectionProps) => {
  const userRole = localStorage.getItem('roleInfo');
  const currentRoleCard = roleCard.find((card) => card.role === userRole)!;

  return (
    <div className="flex py-4 justify-between items-center px-4">
      <div className="font-bold text-heading6">
        <p className="flex gap-1">
          <span className="text-primary_600">{userInfo.username}</span>
          <span>님</span>
        </p>
        <p>{currentRoleCard.ment}</p>
      </div>
      <div className="flex bg-primary_50 rounded-[8px] py-2 px-3 gap-1">
        {currentRoleCard.image}
        <p className="text-body3 font-semibold text-primary_700 m-0">{currentRoleCard.name}</p>
      </div>
    </div>
  );
};

export default RoleSection;

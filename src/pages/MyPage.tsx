import teacher from '../assets/images/teacher_woman.png';
import student from '../assets/images/student_boy.png';
import mom from '../assets/images/parent_mom.png';
import DefaultProfile from '../assets/images/profile.svg?react';
import { FaAngleRight } from 'react-icons/fa6';

const MyPage = () => {
  const userName = '김과외';
  const userRole = '선생님';
  const userMent = '안녕하세요! 과외 경력 6년차 김과외입니다! 잘 부탁드립니다~';

  const userBirth = '2004.04.02';
  const userPhone = '010-4930-2838';

  const roleCard = [
    { role: '선생님', ment: '오늘도 화이팅하세요!', image: <img src={teacher} className="w-6 h-6" /> },
    { role: '학생', ment: '오늘도 열공하세요!', image: <img src={student} className="w-6 h-6" /> },
    { role: '학부모', ment: '오늘도 행복하세요!', image: <img src={mom} className="w-6 h-6" /> },
  ];

  // 반드시 존재한다고 가정
  const currentRoleCard = roleCard.find((card) => card.role === userRole)!;

  return (
    <div>
      {/* 학생/학부모 구분 */}
      <div className="flex py-4 justify-between items-center px-4">
        <div className="font-bold text-heading6">
          <p className="flex gap-1">
            <span className="text-primary_600">{userName}</span>
            <span>님</span>
          </p>
          <p>{currentRoleCard.ment}</p>
        </div>
        <div className="flex bg-primary_50 rounded-[8px] py-2 px-3 gap-1">
          {currentRoleCard.image}
          <p className="text-body3 font-semibold text-primary_700 m-0">{currentRoleCard.role}</p>
        </div>
      </div>
      {/* 프로필 */}
      <div className="flex flex-col mx-4 mt-4 mb-6 py-6 bg-primary_100 items-center justify-center rounded-[16px]">
        <DefaultProfile />
        <p className="text-[22px] font-bold leading-9 pt-6">{userName}</p>
        <p className="text-caption1 leading-[22px] text-gray-500">{userMent}</p>
      </div>
      {/* 내 정보 */}
      <div className="flex flex-col border-y-2 border-gray-100 px-4 py-6 gap-4">
        <p className="text-body1 font-bold leading-9 tracking-[-0.4px]">내 정보</p>
        <div className="gap-1 flex flex-col">
          <div className="flex gap-6">
            <p className="text-body3 font-semibold tracking-[-0.048px] leading-7">출생연도</p>
            <p className="text-body3 tracking-[-0.048px] leading-7 text-gray-500">{userBirth}</p>
          </div>
          <div className="flex gap-6">
            <p className="text-body3 font-semibold tracking-[-0.048px] leading-7">전화번호</p>
            <p className="text-body3 tracking-[-0.048px] leading-7 text-gray-500">{userPhone}</p>
          </div>
        </div>
      </div>
      {/* 이용약관 및 로그아웃 */}
      <div className="py-2 px-4">
        <div className="py-2 font-semibold text-body3 tracking-[-0.048px] leading-7 cursor-pointer flex justify-between items-center">
          <p>이용약관</p>
          <FaAngleRight className="fill-gray-500" />
        </div>
        <div className="py-2 font-semibold text-body3 tracking-[-0.048px] leading-7 cursor-pointer">로그아웃</div>
      </div>
    </div>
  );
};

export default MyPage;

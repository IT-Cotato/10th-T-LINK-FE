import teacher from '../assets/images/teacher_woman.png';
import student from '../assets/images/student_boy.png';
import mom from '../assets/images/parent_mom.png';
import { FaAngleRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal/Modal';
import LogoutModal, { MODAL_TYPE } from '../components/Modal/LogoutModal';
import { getUserInfo } from '../api/mypage.api';
import { formatPhoneNumber } from '../utils/FormatPhoneNumber';
import Edit from '../assets/images/RoomDetail/Edit copy.svg?react';
interface UserInfo {
  role: string;
  username: string;
  statusMessage: string;
  phoneNumber: string;
  profileUrl: string;
}

const MyPage = () => {
  const nav = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const userRole = localStorage.getItem('roleInfo');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: '',
    role: '',
    statusMessage: '',
    phoneNumber: '',
    profileUrl:
      'https://mblogthumb-phinf.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg?type=w800',
  });

  useEffect(() => {
    const getuserInfo = async () => {
      const response = await getUserInfo();
      if (response!.status == 200) {
        setUserInfo(response!.data.data);
      }
    };
    getuserInfo();
  }, []);

  const roleCard = [
    { role: 'TEACHER', name: '선생님', ment: '오늘도 화이팅하세요!', image: <img src={teacher} className="w-6 h-6" /> },
    { role: 'STUDENT', name: '학생', ment: '오늘도 열공하세요!', image: <img src={student} className="w-6 h-6" /> },
    { role: 'PARENT', name: '학부모', ment: '오늘도 행복하세요!', image: <img src={mom} className="w-6 h-6" /> },
  ];

  // 반드시 존재한다고 가정
  const currentRoleCard = roleCard.find((card) => card.role === userRole)!;

  return (
    <div>
      {/* 학생/학부모 구분 */}
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
      {/* 프로필 */}
      <div className="flex flex-col mx-4 mt-4 mb-6 py-6 bg-primary_100 items-center justify-center rounded-[16px]">
        <img src={userInfo?.profileUrl} className="w-[88px] h-[88px] rounded-full" />
        <p className="text-[22px] font-bold leading-9 pt-6">{userInfo.username}</p>
        <div className="flex items-center gap-1">
          <p className="text-caption1 leading-[22px] text-gray-500">
            {userInfo.statusMessage == '' ? `상태메세지를 입력하세요!` : `${userInfo.statusMessage}`}
          </p>
          <Edit className="w-[16px] h-[16px] pb-[1px]" />
        </div>
      </div>
      {/* 내 정보 */}
      <div className="flex flex-col border-y-2 border-gray-100 px-4 py-6 gap-4">
        <p className="text-body1 font-bold leading-9 tracking-[-0.4px]">내 정보</p>
        <div className="flex flex-col">
          <div className="flex gap-6">
            <p className="text-body3 font-semibold tracking-[-0.048px] leading-7">전화번호</p>
            <p className="text-body3 tracking-[-0.048px] leading-7 text-gray-500">
              {formatPhoneNumber(userInfo.phoneNumber)}
            </p>
          </div>
        </div>
      </div>
      {/* 이용약관 및 로그아웃 */}
      <div className="py-2 px-4">
        <div
          className="py-2 font-semibold text-body3 tracking-[-0.048px] leading-7 cursor-pointer flex justify-between items-center"
          onClick={() => nav('terms')}
        >
          <p>이용약관</p>
          <FaAngleRight className="fill-gray-500" />
        </div>
        <div
          className="py-2 font-semibold text-body3 tracking-[-0.048px] leading-7 cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          로그아웃
        </div>
        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <LogoutModal setModalOpen={setModalOpen} type={MODAL_TYPE.LOGOUT} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default MyPage;

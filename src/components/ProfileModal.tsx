import student from '../assets/images/student_boy.png';
import DefaultProfile from '../assets/images/profile.svg?react';
import { useEffect } from 'react';
import { getProfileModal } from '../api/roomList.api';

type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const ProfileModal = ({ setModalOpen, id }: ModalProps) => {
  const userName = '김학생';
  const userRole = '학생';
  const userMent = '초6입니다람쥐';
  const userPhone = '010-1234-5678';

  /*
  useEffect(() => {
    const fetchProfileInfo = async () => {
      const profileInfo = await getProfileModal(id);
    };
    fetchProfileInfo();
  }, []);
  */

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setModalOpen(false)} // 닫힘
    >
      <div
        className="absolute top-10 flex flex-col py-5 w-1/3 h-3/5 bg-primary_100 rounded-[16px]"
        onClick={(e) => e.stopPropagation()} // 닫힘 방지
      >
        <div className="flex justify-center gap-32 w-full">
          <button onClick={() => setModalOpen(false)}>창 닫기</button>
          <div className="flex bg-primary_50 rounded-[8px] py-2 px-3 gap-1">
            <img src={student} className="w-6 h-6" />
            <p className="text-body3 font-semibold text-primary_700 m-0">{userRole}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center items-center">
          <DefaultProfile />
          <p className="text-[22px] font-bold leading-9 pt-6">{userName}</p>
          <p className="text-caption1 leading-[22px] text-gray-500">{userMent}</p>
          <p className="text-body3 tracking-[-0.048px] leading-7 text-gray-500">{userPhone}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

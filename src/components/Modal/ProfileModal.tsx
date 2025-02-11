import student from '../../assets/images/student_boy.png';
import DefaultProfile from '../../assets/images/profile.svg?react';
import { useEffect, useState } from 'react';
import { getProfileModal } from '../../api/roomList.api';

type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const ProfileModal = ({ setModalOpen, id }: ModalProps) => {
  const [profile, setProfile] = useState({
    role: '',
    username: '',
    statusMessage: '',
    profileImageUrl: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const res = await getProfileModal(id);
        const profileInfo = res.data.data;
        console.log(profileInfo);
        setProfile(profileInfo);
      } catch (e) {
        console.log(e);
      }
    };
    fetchProfileInfo();
  }, []);

  return (
    <div className="flex flex-col py-5 w-1/3 min-w-[300px] h-3/5 bg-primary_100 rounded-[16px]">
      <div className="flex justify-center gap-32 w-full">
        <button onClick={() => setModalOpen(false)}>창 닫기</button>
        <div className="flex bg-primary_50 rounded-[8px] py-2 px-3 gap-1">
          <p className="text-body3 font-semibold text-primary_700 m-0">{profile.role}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center items-center">
        <img src={profile.profileImageUrl} className="w-20 h-20 rounded-full" />
        <p className="text-[22px] font-bold leading-9 pt-6">{profile.username}</p>
        <p className="text-caption1 leading-[22px] text-gray-500">{profile.statusMessage}</p>
        <p className="text-body3 tracking-[-0.048px] leading-7 text-gray-500">{profile.phoneNumber}</p>
      </div>
    </div>
  );
};

export default ProfileModal;

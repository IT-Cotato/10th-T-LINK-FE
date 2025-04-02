import { useEffect, useState } from 'react';
import { getProfileModal } from '../../api/roomList.api';
import { formatPhoneNumber } from '../../utils/FormatPhoneNumber';
import { IoClose } from 'react-icons/io5';

type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  profileImg: string;
};

const ProfileModal = ({ setModalOpen, id, profileImg }: ModalProps) => {
  const [profile, setProfile] = useState({
    role: '',
    username: '',
    statusMessage: '',
    profileImageUrl: '',
    phoneNumber: '',
  });

  useEffect(() => {
    getProfileModal(id).then((res) => {
      const profileInfo = res.data;
      setProfile(profileInfo);
    });
  }, []);

  return (
    <div className="flex w-[340px] flex-col p-4 gap-2.5 bg-white rounded-[16px]">
      <div className="flex items-center justify-between">
        <div className="w-4" />
        <h1 className="font-semibold text-lg leading-8">프로필</h1>
        <IoClose size={20} onClick={() => setModalOpen(false)} />
      </div>

      <div className="flex flex-1 flex-col gap-6 justify-center items-center bg-primary_100 rounded-2xl py-6">
        <img src={profile.profileImageUrl} className="w-20 h-20 rounded-full" />
        <div className="flex flex-col items-center">
          <p className="text-[22px] font-bold leading-9">{profile.username}</p>
          <p className="text-caption1 leading-[22px] text-gray-500">{profile.statusMessage}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-1 items-center px-3 py-2 bg-primary_100 rounded-lg">
          <img className="h-6 w-6" src={profileImg} />
          <p className="text-primary_700 text-body3 font-semibold leading-[22px]">
            {profile.role === 'STUDENT' ? '학생' : '선생님'}
          </p>
        </div>

        <div className="flex gap-2 items-center px-2">
          <p className="text-base font-semibold leading-7">전화번호</p>
          <p className="text-body3 leading-7 text-gray-500">
            {formatPhoneNumber(profile.phoneNumber)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;

import { MyPageUserInfo } from '../../models/user.model';
import Edit from '../../assets/images/RoomDetail/Edit copy.svg?react';

interface ProfileSectionProps {
  userInfo: MyPageUserInfo;
  onEdit: () => void;
}

const ProfileSection = ({ userInfo, onEdit }: ProfileSectionProps) => {
  return (
    <div className="flex flex-col mx-4 mt-4 mb-6 py-6 bg-primary_100 items-center justify-center rounded-[16px]">
      <img src={userInfo?.profileUrl} className="w-[88px] h-[88px] rounded-full" />
      <p className="text-[22px] font-bold leading-9 pt-6">{userInfo.username}</p>
      <div className="flex items-center gap-1">
        <p className="text-caption1 leading-[22px] text-gray-500">
          {userInfo.statusMessage == '' ? `상태메세지를 입력하세요!` : `${userInfo.statusMessage}`}
        </p>
        <Edit className="w-[16px] h-[16px] pb-[1px]" onClick={onEdit} />
      </div>
    </div>
  );
};

export default ProfileSection;

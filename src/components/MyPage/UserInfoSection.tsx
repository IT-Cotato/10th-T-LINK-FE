import { MyPageUserInfo } from '../../models/user.model';
import { formatPhoneNumber } from '../../utils/FormatPhoneNumber';

interface UserInfoSectionProps {
  userInfo: MyPageUserInfo;
}

const UserInfoSection = ({ userInfo }: UserInfoSectionProps) => {
  return (
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
  );
};

export default UserInfoSection;

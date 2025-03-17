import { FaAngleRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

interface SettingsSectionProps {
  onLogout: () => void;
  onTerms: () => void;
}

const SettingsSection = ({ onLogout, onTerms }: SettingsSectionProps) => {
  const nav = useNavigate();

  return (
    <div className="py-2 px-4">
      <div
        className="py-2 font-semibold text-body3 tracking-[-0.048px] leading-7 cursor-pointer flex justify-between items-center"
        onClick={onTerms}
      >
        <p>이용약관</p>
        <FaAngleRight className="fill-gray-500" />
      </div>
      <div
        className="py-2 font-semibold text-body3 tracking-[-0.048px] leading-7 cursor-pointer"
        onClick={onLogout}
      >
        로그아웃
      </div>
    </div>
  );
};

export default SettingsSection;

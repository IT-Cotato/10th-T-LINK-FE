import { Role } from '../utils/RoleList';
import { FaRegCheckCircle } from 'react-icons/fa';
import { FaCheckCircle } from 'react-icons/fa';

interface RoleProps {
  role: Role;
  onSelect: () => void;
  isSelected: boolean;
}

const RoleSelectionButton = ({ role, onSelect, isSelected }: RoleProps) => {
  const { title, description, src } = role;
  return (
    <div
      className={`flex justify-between items-center p-4 border-2 rounded-xl ${isSelected ? 'bg-primary_100 border-primary_500' : ''}`}
      onClick={onSelect}
    >
      <div className="flex gap-7">
        <div
          className={`flex justify-center items-center rounded-full w-12 h-12 ${isSelected ? 'bg-white' : 'bg-primary_100'}`}
        >
          <img className="w-9 h-9" src={src} alt={title} />
        </div>
        <div className="text-gray-900">
          <h1 className={`text-body1 font-bold ${isSelected ? 'text-primary_800' : ''}`}>{title}</h1>
          <h3 className="text-body4 font-regular">{description}</h3>
        </div>
      </div>

      {isSelected ? <FaCheckCircle color="#60CE3F" size={28} /> : <FaRegCheckCircle color="#AAA9A6" size={28} />}
    </div>
  );
};

export default RoleSelectionButton;

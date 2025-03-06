import { Role } from '../../utils/RoleList';
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
      className={`flex w-full justify-center items-center py-2.5 border rounded-xl gap-4 px-4 cursor-pointer ${isSelected ? 'bg-primary_100 border-primary_500' : 'border-gray-200'}`}
      onClick={onSelect}
    >
      <div className={`flex items-center rounded-full p-1.5 ${isSelected ? 'bg-white' : 'bg-primary_100'}`}>
        <img className="w-9 h-9" src={src} alt={title} />
      </div>
      <div className="flex flex-1 flex-col text-gray-900">
        <h1 className={`text-body1 font-bold leading-9 ${isSelected ? 'text-primary_800' : ''}`}>{title}</h1>
        <h3 className="text-body4 font-regular leading-6">{description}</h3>
      </div>
      {isSelected ? <FaCheckCircle color="#60CE3F" size={28} /> : <FaRegCheckCircle color="#AAA9A6" size={28} />}
    </div>
  );
};

export default RoleSelectionButton;

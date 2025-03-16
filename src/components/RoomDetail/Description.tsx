import { useNavigate } from 'react-router-dom';
import Edit from '../../assets/images/RoomDetail/Edit.svg?react';

interface DescriptionProps {
  title: string;
  className?: string;
  desc: string;
  edit?: boolean;
}

const Description = ({ title, desc, className, edit }: DescriptionProps) => {
  const userRole = localStorage.getItem('roleInfo');
  const nav = useNavigate();

  return (
    <div className={`py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-heading6 font-bold leading-10 text-gray-900">{title}</p>
        {userRole == 'TEACHER' && edit !== false ? <Edit onClick={() => nav(`edit`)} /> : ''}
      </div>
      <p className="text-body4 font-normal leading-7 tracking-[-0.048px] text-gray-600">{desc}</p>
    </div>
  );
};

export default Description;

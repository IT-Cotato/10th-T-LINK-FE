import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center h-16 px-4">
      <div className="cursor-pointer" onClick={() => navigate(-1)}>
        <GoArrowLeft size={24} />
      </div>
      <div className="flex-1"></div>
    </div>
  );
};

export default Header;

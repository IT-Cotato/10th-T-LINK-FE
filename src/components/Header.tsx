import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center h-16">
      <button className="bg-transparent" onClick={() => navigate(-1)}>
        <GoArrowLeft size={24} />
      </button>
      <div className="flex-1"></div>
    </div>
  );
};

export default Header;

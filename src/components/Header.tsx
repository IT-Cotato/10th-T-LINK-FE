import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center px-2 py-1.5">
      <div className="flex p-2.5 justify-center items-center cursor-pointer" onClick={() => navigate(-1)}>
        <GoArrowLeft size={24} />
      </div>
      <div className="flex-1 text-center">t-link</div>
      <div className="w-11" />
    </div>
  );
};

export default Header;

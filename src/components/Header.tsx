import { useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex">
      <button onClick={() => navigate(-1)}>
        <GoArrowLeft />
      </button>
      <div>로고 이미지</div>
    </div>
  );
};

export default Header;

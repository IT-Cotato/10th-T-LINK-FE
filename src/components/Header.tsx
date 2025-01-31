import { useLocation, useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [left, setLeft] = useState(false);
  const [title, setTitle] = useState('');
  const [border, setBorder] = useState(true);

  useEffect(() => {
    if (location.includes('/materials')) {
      setTitle('강의 자료함');
      setLeft(true);
    } else if (location.includes('/homework')) {
      setTitle('주차별 숙제');
      setLeft(true);
    } else if (location.includes('/diary')) {
      setTitle('상담일지');
      setLeft(true);
    } else if (location.startsWith('/user/roomlist/')) {
      setTitle('과외방 상세');
      setLeft(true);
    } else {
      switch (location) {
        case '/user/mypage':
          setTitle('내 정보');
          setLeft(false);
          break;
        case '/user/calendar':
          setTitle('달력');
          setLeft(false);
          break;
        case '/user/roomlist':
          setTitle('과외방');
          setLeft(false);
          break;
        case '/user/mypage/terms':
          setTitle('이용약관');
          setLeft(true);
          break;
        case '/signup':
        case '/formbasic':
        case '/formtel':
          setLeft(true);
          setBorder(false);
          break;
        default:
          setTitle('');
          break;
      }
    }
  }, [location]);

  return (
    <div className={`flex items-center py-2 px-1.5 ${border ? 'border-b-2' : 'border-0'} border-b-gray-100`}>
      <div
        className={`flex w-11 h-11 justify-center items-center ${left ? 'cursor-pointer' : ''} `}
        onClick={() => {
          left ? navigate(-1) : '';
        }}
      >
        {left && <GoArrowLeft size={24} />}
      </div>
      <div className="flex-1 text-center font-semibold text-lg">{title}</div>
      <div className="w-11 h-11" />
    </div>
  );
};

export default Header;

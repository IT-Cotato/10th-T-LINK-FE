import { useLocation, useNavigate } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import { useMemo } from 'react';

// 뒤로 가기 없는 페이지들
const ROUTE_TITLES: { [key: string]: string } = {
  '/user/mypage': '내 정보',
  '/user/calendar': '달력',
  '/user/roomlist': '과외방',
};

// 뒤로 가기 존재
const HEADER_CONFIG = [
  { path: '/materials', title: '강의 자료함' },
  { path: '/homework', title: '주차별 숙제' },
  { path: '/diary', title: '상담일지' },
  { path: '/mypage/terms', title: '이용약관' },
  { path: '/user/', title: '과외방 상세', startsWith: true },
];

// 회원가입 관련 페이지들
const SIGNUP_PATHS = ['/signup', '/formbasic', '/formtel'];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const { title, left } = useMemo(() => {
    // 뒤로 가기 없음
    if (ROUTE_TITLES[location]) {
      return { title: ROUTE_TITLES[location], left: false };
    }

    // 뒤로 가기 있음
    for (const { path, title, startsWith } of HEADER_CONFIG) {
      if (startsWith ? location.startsWith(path) : location.includes(path)) {
        return { title, left: true };
      }
    }

    // 회원가입 관련 페이지
    if (SIGNUP_PATHS.includes(location)) {
      return { title: '', left: true };
    }

    return { title: '', left: false };
  }, [location]);

  return (
    <div
      className={`flex items-center py-2 px-1.5 ${SIGNUP_PATHS.includes(location) ? 'border-0' : 'border-b-2'} border-b-gray-100`}
    >
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

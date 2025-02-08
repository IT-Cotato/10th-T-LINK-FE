import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import { useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { deleteRoom } from '../api/roomList.api';
import Modal from './Modal/Modal';
import RoomDelteModal from './Modal/RoomDeleteModal';

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
  { path: '/createroom', title: '과외방 개설하기' },
  { path: '/edit', title: '과외방 정보 수정' },
  { path: '/user/', title: '과외방 상세', startsWith: true },
];

// 회원가입 관련 페이지들
const SIGNUP_PATHS = ['/signup', '/formbasic', '/formtel'];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [modalOpen, setModalOpen] = useState(false);

  const { title, left, hasBorder } = useMemo(() => {
    // 뒤로 가기 없음
    if (ROUTE_TITLES[location]) {
      return { title: ROUTE_TITLES[location], left: false, hasBorder: false };
    }

    // 뒤로 가기 있음
    for (const { path, title, startsWith } of HEADER_CONFIG) {
      if (startsWith ? location.startsWith(path) : location.includes(path)) {
        return { title, left: true, hasBorder: true };
      }
    }

    // 회원가입 관련 페이지
    if (SIGNUP_PATHS.includes(location)) {
      return { title: '', left: true, hasBorder: true };
    }

    return { title: '', left: false, hasBorder: false };
  }, [location]);

  return (
    <div className={`flex items-center py-2 px-1.5 ${hasBorder ? 'border-0' : 'border-b-2'} border-b-gray-100`}>
      <div
        className={`flex w-11 h-11 justify-center items-center ${left ? 'cursor-pointer' : ''} `}
        onClick={() => {
          left ? navigate(-1) : '';
        }}
      >
        {left && <GoArrowLeft size={24} />}
      </div>
      <div className="flex-1 text-center font-semibold text-lg">{title}</div>
      <div className="flex w-11 h-11 items-center justify-center" onClick={() => {}}>
        {title === '과외방 정보 수정' ? (
          <button onClick={() => setModalOpen(true)}>
            <FiTrash2 size={22} />
          </button>
        ) : (
          ''
        )}
      </div>
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <RoomDelteModal setModalOpen={setModalOpen} />
        </Modal>
      )}
    </div>
  );
};

export default Header;

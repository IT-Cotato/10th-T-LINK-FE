import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { GoArrowLeft } from 'react-icons/go';
import { useEffect, useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import Modal from './Modal/Modal';
import RoomDeleteModal from './Modal/RoomDeleteModal';
import useDeleteStore from '../store/useDeleteStore';

// 뒤로 가기 없는 페이지들
const ROUTE_TITLES: { [key: string]: string } = {
  '/user/mypage': '내 정보',
  '/user/calendar': '달력',
  '/user/roomlist': '과외방',
};

// 뒤로 가기 존재
const HEADER_CONFIG = [
  { path: '/mypage/terms', title: '이용약관' },
  { path: '/createroom', title: '과외방 개설하기' },
  { path: '/edit', title: '과외방 정보 수정' },
  { path: '/user/', title: '과외방 상세', startsWith: true },
];

// 회원가입 관련 페이지들
const SIGNUP_PATHS = ['/signup', '/formbasic', '/formtel'];

const Header = () => {
  const roleInfo = localStorage.getItem('roleInfo');
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { roomId, homeworkId, materialId, counselingId } = useParams();
  const { setModalOpen, what, setWhat } = useDeleteStore();

  const { title, left, hasBorder } = useMemo(() => {
    // 뒤로 가기 없음
    if (ROUTE_TITLES[location]) {
      return { title: ROUTE_TITLES[location], left: '', hasBorder: false };
    }

    // 뒤로 가기 있음
    for (const { path, title, startsWith } of HEADER_CONFIG) {
      if (startsWith ? location.startsWith(path) : location.includes(path)) {
        // 과외방 상세 페이지일 때
        if (location.includes('/user/')) {
          if (location.endsWith(`/${roomId}`)) {
            return { title: '과외방 상세', left: '/user/roomlist', hasBorder: false };
          }
        }

        // 숙제 관련 경로
        if (location.includes('/homework')) {
          if (location.endsWith('/edit')) {
            return { title: '숙제 정보 수정', left: true, hasBorder: false };
          }
          if (location.endsWith('/create')) {
            return { title: '숙제 업로드', left: true, hasBorder: false };
          }
          if (homeworkId) {
            return { title: '숙제 상세', left: true, hasBorder: false };
          }
          return { title: '숙제', left: `/user/${roomId}`, hasBorder: false };
        }

        // 강의 자료 관련 경로
        if (location.includes('/materials')) {
          if (location.endsWith('/edit')) {
            return { title: '강의 자료 수정', left: true, hasBorder: false };
          }
          if (location.endsWith('/create')) {
            return { title: '강의 자료 업로드', left: true, hasBorder: false };
          }
          if (materialId) {
            return { title: '강의 자료 상세', left: true, hasBorder: false };
          }
          return { title: '강의 자료함', left: `/user/${roomId}`, hasBorder: false };
        }

        // 상담 일지 관련 경로
        if (location.includes('/diary')) {
          if (location.endsWith('/edit')) {
            return { title: '상담 일지 수정', left: true, hasBorder: false };
          }
          if (location.endsWith('/create')) {
            return { title: '상담 일지 업로드', left: true, hasBorder: false };
          }

          if (counselingId) {
            return { title: '상담 일지 상세', left: true, hasBorder: false };
          }
          return { title: '상담 일지', left: `/user/${roomId}`, hasBorder: false };
        }

        // 입금 관련 경로
        if (location.includes('/payment')) {
          if (location.endsWith('/create')) {
            return { title: '입금일 생성하기', left: true, hasBorder: false };
          }
          if (location.endsWith('/edit')) {
            return { title: '입금일 정보 수정', left: true, hasBorder: false };
          }
          return { title: '입금일', left: `/user/${roomId}`, hasBorder: false };
        }

        // 통계 관련 경로
        if (location.includes('/stats')) {
          if (location.endsWith('/create')) {
            return { title: '성적 추가하기', left: true, hasBorder: false };
          }
          if (location.endsWith('/edit')) {
            return { title: '입금일 정보 수정', left: true, hasBorder: false };
          }
          return { title: '성적 통계', left: `/user/${roomId}`, hasBorder: false };
        }

        return { title, left: true, hasBorder: false };
      }
    }

    // 회원가입 관련 페이지
    if (SIGNUP_PATHS.includes(location)) {
      return { title: '', left: true, hasBorder: true };
    }

    return { title: '', left: false, hasBorder: false };
  }, [location]);

  useEffect(() => {
    switch (title) {
      case '과외방 정보 수정':
        setWhat('해당 과외방을');
        break;
      case '강의 자료 상세':
        setWhat('해당 자료를');
        break;
      case '숙제 상세':
        setWhat('해당 숙제를');
        break;
      case '상담 일지 상세':
        setWhat('해당 일지를');
        break;
      case '입금일 정보 수정':
        setWhat('입금일 정보를');
        break;
      case '성적 추가하기':
        setWhat('모든 성적 기록을');
        break;
      default:
        setWhat('');
    }
  }, [title, setWhat]);

  const showBin = useMemo(() => {
    return what !== '';
  }, [what]);

  return (
    <div className={`flex items-center py-2 px-1.5 ${hasBorder ? 'border-0' : 'border-b-2'} border-b-gray-100`}>
      <div
        className={`flex w-11 h-11 justify-center items-center ${left ? 'cursor-pointer' : ''} `}
        onClick={() => {
          if (left) {
            if (typeof left === 'string') {
              navigate(left);
            } else {
              navigate(-1);
            }
          }
        }}
      >
        {left && <GoArrowLeft size={24} />}
      </div>
      <div className="flex-1 text-center font-semibold text-lg">{title}</div>
      <div className="flex w-11 h-11 items-center justify-center" onClick={() => {}}>
        {showBin && roleInfo === 'TEACHER' && (
          <button onClick={() => setModalOpen(true)}>
            <FiTrash2 size={22} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

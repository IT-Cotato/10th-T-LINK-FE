import { GoArrowLeft } from 'react-icons/go';
import { termsList, termsOfService1, termsOfService2, termsOfService3 } from '../constants/termsOfService';
import { useNavigate } from 'react-router-dom';
import BottomButton from '../assets/images/term_button.svg?react';
import TopButton from '../assets/images/Top Button.svg?react';

import { useEffect, useState } from 'react';

const UserPolicy = () => {
  const nav = useNavigate();
  const [isBottom, setIsBottom] = useState(false);
  const [button, setButton] = useState(<BottomButton />);

  const detectBottom = () => {
    const scrollTop = window.scrollY; // 스크롤된 높이
    const clientHeight = document.documentElement.clientHeight; // 보이는 화면 높이
    const scrollHeight = document.documentElement.scrollHeight; // 전체 문서 높이
    return scrollTop + clientHeight >= scrollHeight - 1; // 부정확한 계산을 보정하기 위해 -1 사용
  };

  const handleScrollEvent = () => {
    if (detectBottom()) {
      setIsBottom(true);
      setButton(<TopButton />);
    } else {
      setIsBottom(false);
      setButton(<BottomButton />);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent);

    // 컴포넌트가 언마운트되면 이벤트 리스너 제거
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const handleScroll = () => {
    if (detectBottom()) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="flex flex-col mb-[62px]">
      {/* 헤더 */}
      <div className="fixed py-2 px-[6px] border-b-2 border-gray-100 flex items-center bg-white w-full">
        <div className="flex p-2.5 justify-center items-center cursor-pointer" onClick={() => nav(-1)}>
          <GoArrowLeft size={24} />
        </div>
        <div className="flex-1 text-center text-body2 font-semibold leading-6 tracking-[-0.27px]">이용약관</div>
        <div className="w-11" />
      </div>
      <div className="flex flex-col mt-[62px]">
        {/* 이용약관 */}
        <div className="p-4 border-b-2 border-gray-100 flex flex-col gap-2 tracking-[-0.048px] leading-7 text-body3">
          <p className="font-semibold ">1. 비즈니스 파트너 개인정보 처리방침</p>
          <p className="whitespace-pre-line text-gray-500">{termsOfService1}</p>
        </div>
        <div className="p-4 border-b-2 border-gray-100 flex flex-col gap-2 tracking-[-0.048px] leading-7 text-body3">
          <p className="font-semibold ">2. 개인정보 수집</p>
          <p className="whitespace-pre-line text-gray-500">{termsOfService2}</p>
        </div>
        <div className="p-4 border-b-2 border-gray-100 flex flex-col gap-2 tracking-[-0.048px] leading-7 text-body3">
          <p className="font-semibold ">3. 개인정보 이용</p>
          <div className="whitespace-pre-line text-gray-500">
            <p>{termsOfService3}</p>
            <ul className="list-disc list-inside">
              {termsList.map((term, index) => (
                <li key={index}>{term}</li>
              ))}
            </ul>
          </div>
        </div>
        {/* 탈퇴 */}
        <div className="p-4 font-semibold text-body3 tracking-[-0.048px] leading-7 cursor-pointer">회원 탈퇴</div>
        <div className="fixed bottom-[14px] left-1/2 transform -translate-x-1/2 cursor-pointer" onClick={handleScroll}>
          {button}
        </div>
      </div>
    </div>
  );
};

export default UserPolicy;

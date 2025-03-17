import {
  termsList,
  termsOfService1,
  termsOfService2,
  termsOfService3,
} from '../../constants/termsOfService';
import BottomButton from '../../assets/images/term_button.svg?react';
import TopButton from '../../assets/images/Top Button.svg?react';

import { useEffect, useRef, useState } from 'react';
import Modal from '../../components/Modal/Modal';
import LogoutModal, { MODAL_TYPE } from '../../components/Modal/LogoutModal';
import Header from '../../components/Common/Header';

const UserPolicy = () => {
  const [isBottom, setIsBottom] = useState(false);
  const [button, setButton] = useState(<BottomButton />);
  const [modalOpen, setModalOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement | null>(null);

  const detectBottom = () => {
    if (mainRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = mainRef.current;
      return scrollHeight > clientHeight && scrollTop + clientHeight >= scrollHeight - 1;
    }
    return false;
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
    const scrollContainer = mainRef.current;
    if (!scrollContainer) return;

    scrollContainer.addEventListener('scroll', handleScrollEvent);
    return () => {
      scrollContainer.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  const handleScroll = () => {
    setTimeout(() => {
      if (!mainRef.current) return;
      const { scrollHeight } = mainRef.current;

      requestAnimationFrame(() => {
        mainRef.current!.scrollTo({
          top: detectBottom() ? 0 : scrollHeight,
          behavior: 'smooth',
        });
      });
    }, 50);
  };

  return (
    <div className="flex flex-col bg-white h-full">
      {/* 헤더 */}
      <div className="fixed w-full max-w-[500px]">
        <Header />
      </div>
      <div ref={mainRef} className="flex flex-col my-[62px] overflow-auto scrollbar-none">
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
        <div
          className="p-4 font-semibold text-body3 tracking-[-0.048px] leading-7 cursor-pointer mb-[70px]"
          onClick={() => setModalOpen(true)}
        >
          회원 탈퇴
        </div>
        {modalOpen && (
          <Modal onClose={() => setModalOpen(false)}>
            <LogoutModal setModalOpen={setModalOpen} type={MODAL_TYPE.QUIT} />
          </Modal>
        )}
        <div
          className="fixed bottom-[14px] left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={handleScroll}
        >
          {button}
        </div>
      </div>
    </div>
  );
};

export default UserPolicy;

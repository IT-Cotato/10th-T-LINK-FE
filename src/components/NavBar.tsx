import { useState } from 'react';
import { GoHome } from 'react-icons/go';
import { GoHomeFill } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

// useLocationd을 사용해 경로로 접근하는 방식도 고려 필요
// 경로로 접근할 일은 없으니 상관없나?

const NavBar = () => {
  const nav = useNavigate();
  const [currentMenu, setCurrentMenu] = useState<string>('roomList');

  return (
    <div className="border-t border-gray-300 flex">
      <div className="py-2 flex justify-around w-full">
        {/* 과외방 */}
        <div
          className="flex-col cursor-pointer"
          onClick={() => {
            setCurrentMenu('roomList');
            nav('roomlist');
          }}
        >
          {currentMenu == 'roomList' ? (
            <GoHomeFill className="w-[42px] h-[42px]" />
          ) : (
            <GoHome className="w-[42px] h-[42px]" />
          )}
          <p className="text-center">과외방</p>
        </div>
        {/* 캘린더 */}
        <div
          className="flex-col cursor-pointer"
          onClick={() => {
            setCurrentMenu('calendar');
            nav('calendar');
          }}
        >
          {currentMenu == 'calendar' ? (
            <GoHomeFill className="w-[42px] h-[42px]" />
          ) : (
            <GoHome className="w-[42px] h-[42px]" />
          )}
          <p className="text-center">캘린더</p>
        </div>
        {/* 내 정보 */}
        <div
          className="flex-col cursor-pointer"
          onClick={() => {
            setCurrentMenu('mypage');
            nav('mypage');
          }}
        >
          {currentMenu == 'mypage' ? (
            <GoHomeFill className="w-[42px] h-[42px]" />
          ) : (
            <GoHome className="w-[42px] h-[42px]" />
          )}
          <p className="text-center">내 정보</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

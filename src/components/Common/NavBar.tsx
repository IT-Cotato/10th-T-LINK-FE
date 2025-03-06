import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CalendarSvg from '../../assets/images/calendar.svg?react';
import CalendarFill from '../../assets/images/calendarFill.svg?react';
import HomeSvg from '../../assets/images/home.svg?react';
import HomeFill from '../../assets/images/homeFill.svg?react';
import MypageSvg from '../../assets/images/mypage.svg?react';
import MyPageFill from '../../assets/images/mypageFill.svg?react';
import Indicator from '../../assets/images/Indicator.svg?react';

const NavBar = () => {
  const nav = useNavigate();
  const location = useLocation();
  const [currentMenu, setCurrentMenu] = useState<string>('roomlist');

  useEffect(() => {
    const pathname = location.pathname.split('/');
    if (pathname[2] === 'calendar' || pathname[2] === 'mypage') {
      setCurrentMenu(pathname[2]);
    } else {
      setCurrentMenu('roomlist');
    }
  }, [location]);

  const menus = [
    {
      menu: '과외방',
      name: 'roomlist',
      inactive: <HomeSvg className="w-6 h-6" />,
      active: <HomeFill className="w-6 h-6" />,
    },
    {
      menu: '달력',
      name: 'calendar',
      inactive: <CalendarSvg className="w-6 h-6" />,
      active: <CalendarFill className="w-6 h-6" />,
    },
    {
      menu: '내 정보',
      name: 'mypage',
      inactive: <MypageSvg className="w-6 h-6" />,
      active: <MyPageFill className="w-6 h-6" />,
    },
  ];

  return (
    <div className="border-t border-gray-200 flex bg-white">
      <div className="grid grid-cols-3 w-full px-[7.5px]">
        {menus.map((menuItem) => (
          <div
            key={menuItem.name}
            className={`flex-col cursor-pointer px-4 flex items-center ${currentMenu === menuItem.name ? 'pt-[6px] pb-[0px]' : 'py-[6px]'}`}
            onClick={() => {
              nav(menuItem.name);
            }}
          >
            <div
              className={`items-center flex flex-col gap-1 ${currentMenu === menuItem.name ? 'pt-[4px] pb-[0px]' : 'pt-[9px] pb-[2px]'}`}
            >
              {currentMenu === menuItem.name ? menuItem.active : menuItem.inactive}
              <p
                className={`text-center ${currentMenu === menuItem.name ? 'text-body4 text-primary_600 font-semibold' : 'text-caption1 text-gray-500'}`}
              >
                {menuItem.menu}
              </p>
              {currentMenu === menuItem.name ? <Indicator className="h-[6px]" /> : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;

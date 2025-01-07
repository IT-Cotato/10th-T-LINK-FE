import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import { useEffect, useRef, useState } from 'react';

// 로그인 이후 사용 가능한 페이지 -> 헤더와 해당 페이지가 렌더링 되는 것으로 레이아웃이 동일함
const Layout = () => {
  const headerHeight = useRef<HTMLDivElement>(null);
  const navBarHeight = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState({ header: 0, navbar: 0 });

  useEffect(() => {
    if (headerHeight.current && navBarHeight.current) {
      const header = headerHeight.current.offsetHeight;
      const navBar = navBarHeight.current.offsetHeight;
      setHeights({ header: header, navbar: navBar });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen scrollbar-none">
      <div className="fixed w-full max-w-[500px]" ref={headerHeight}>
        <Header />
      </div>
      <main
        className="flex-grow px-4 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300"
        style={{
          marginTop: `${heights.header}px`,
          marginBottom: `${heights.navbar}px`,
          // 이거 100vh로 안하고 이걸로 햇는데... 딱히 적용이 안되는 것 같아서 나중에 확인해봐야함.
          height: `calc(calc(var(--vh, 1vh) * 100) - ${heights.header + heights.navbar}px)`,
        }}
      >
        <Outlet />
      </main>
      <footer className="fixed bottom-0 max-w-[500px] w-full h-1/8" ref={navBarHeight}>
        <NavBar />
      </footer>
    </div>
  );
};

export default Layout;

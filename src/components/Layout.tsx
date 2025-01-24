import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import { useEffect, useRef, useState } from 'react';

// 로그인 이후 사용 가능한 페이지 -> 헤더와 해당 페이지가 렌더링 되는 것으로 레이아웃이 동일함
const Layout = () => {
  const headerHeight = useRef<HTMLDivElement>(null);
  const navBarHeight = useRef<HTMLDivElement>(null);
  const [heights, setHeights] = useState({ header: 0, navbar: 0 });
  const clientHeight = document.documentElement.clientHeight;

  console.log(clientHeight);

  useEffect(() => {
    if (headerHeight.current && navBarHeight.current) {
      const header = headerHeight.current.offsetHeight;
      const navBar = navBarHeight.current.offsetHeight;
      setHeights({ header: header, navbar: navBar });
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="fixed w-full max-w-[500px]" ref={headerHeight}>
        <Header />
      </div>
      <main
        className="flex-grow overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300"
        style={{
          marginTop: `${heights.header}px`,
          marginBottom: `${heights.navbar}px`,
          height: `calc(100dvh - ${heights.header + heights.navbar}px)`,
        }}
      >
        <Outlet />
      </main>
      <footer className="fixed bottom-0 max-w-[500px] w-full" ref={navBarHeight}>
        <NavBar />
      </footer>
    </div>
  );
};

export default Layout;

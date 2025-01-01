import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';

// 로그인 이후 사용 가능한 페이지 -> 헤더와 해당 페이지가 렌더링 되는 것으로 레이아웃이 동일함
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-4">
        <Outlet />
      </main>
      <footer className="sticky bottom-0 h-1/8">
        <NavBar />
      </footer>
    </div>
  );
};

export default Layout;

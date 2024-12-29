// router.ts
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Splash from '../pages/Splash';
import RoomList from '../pages/RoomList';
import Calendar from '../pages/Calendar';
import MyPage from '../pages/MyPage';
import Layout from '../components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: 'user',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'rooms',
        element: <RoomList />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
    ],
  },
]);

export default router;

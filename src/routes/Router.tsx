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
import RoomDetail from '../pages/RoomDetail';
import Materials from '../pages/Materials';
import Homework from '../pages/Homework';
import CounselingDiary from '../pages/CounselingDiary';
import Payment from '../pages/Payment';
import Statistics from '../pages/Statistics';

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
        path: 'roomlist',
        element: <RoomList />,
        children: [
          {
            path: 'roomId',
            element: <RoomDetail />,
            children: [
              { path: 'materials', element: <Materials /> },
              { path: 'homework', element: <Homework /> },
              { path: 'stats', element: <Statistics /> },
              { path: 'diary', element: <CounselingDiary /> },
              { path: 'payment', element: <Payment /> },
            ],
          },
        ],
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

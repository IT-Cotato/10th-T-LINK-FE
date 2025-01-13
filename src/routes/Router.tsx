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
import CreateRoom from '../pages/CreateRoom';
import KakaoOauth from '../components/KakaoOauth';
import CreateHomework from '../pages/CreateHomework';
import HomeworkDetail from '../pages/HomeworkDetail';
import EditRoom from '../pages/EditRoom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  { path: 'oauth', element: <KakaoOauth /> },
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
        children: [
          { index: true, element: <RoomList /> },
          { path: 'createroom', element: <CreateRoom /> },
          {
            path: ':roomId',
            children: [
              { index: true, element: <RoomDetail /> },
              { path: 'edit', element: <EditRoom /> },
              { path: 'materials', element: <Materials /> },
              { path: 'homework', element: <Homework /> }, // 숙제방
              { path: 'homework/create', element: <CreateHomework /> }, // 숙제 업로드
              { path: 'homework/:homeworkId', element: <HomeworkDetail /> }, // 숙제 상세
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

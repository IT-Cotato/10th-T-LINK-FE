// router.ts
import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Signup from '../pages/Signup/Signup';
import Login from '../pages/Login';
import Splash from '../pages/Splash';
import RoomList from '../pages/Room/RoomList';
import Calendar from '../pages/Calendar';
import MyPage from '../pages/MyPage';
import Layout from '../components/Layout';
import RoomDetail from '../pages/Room/RoomDetail';
import Payment from '../pages/Payment';
import Statistics from '../pages/Statistics';
import CreateRoom from '../pages/Room/CreateRoom';
import KakaoOauth from '../components/KakaoOauth';
import EditRoom from '../pages/Room/EditRoom';
import FormTel from '../pages/Signup/FormTel';
import FormBasic from '../pages/Signup/FormBasic';
import SignupComplete from '../pages/Signup/SignupComplete';
import Materials from '../pages/Material/Materials';
import CreateMaterials from '../pages/Material/CreateMaterials';
import Homework from '../pages/Homework/Homework';
import CreateHomework from '../pages/Homework/CreateHomework';
import HomeworkDetail from '../pages/Homework/HomeworkDetail';
import MaterialDetail from '../pages/Material/MaterialDetail';
import CounselingDiary from '../pages/Counseling/CounselingDiary';
import CreateCounseling from '../pages/Counseling/CreateCounseling';
import CounselingDetail from '../pages/Counseling/CounselingDetail';
import UserPolicy from '../pages/UserPolicy';
import ShareCode from '../pages/Room/ShareCode';
import Invite from '../pages/Invite';

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
  { path: 'formbasic', element: <FormBasic /> },
  { path: 'formtel', element: <FormTel /> },
  { path: 'signupcomplete', element: <SignupComplete /> },
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
        children: [{ path: 'invite/:roomId', element: <Invite /> }],
      },
      {
        path: ':roomId',
        children: [
          { index: true, element: <RoomDetail /> },
          { path: 'edit', element: <EditRoom /> },
          { path: 'materials', element: <Materials /> }, // 강의 자료함
          { path: 'materials/create', element: <CreateMaterials /> }, // 강의 자료 업로드
          { path: 'materials/:materialId', element: <MaterialDetail /> }, // 강의 자료 상세
          { path: 'homework', element: <Homework /> }, // 숙제방
          { path: 'homework/create', element: <CreateHomework /> }, // 숙제 업로드
          { path: 'homework/:homeworkId', element: <HomeworkDetail /> }, // 숙제 상세
          { path: 'stats', element: <Statistics /> },
          { path: 'diary', element: <CounselingDiary /> }, // 상담 일지
          { path: 'diary/create', element: <CreateCounseling /> }, // 상담 일지 업로드
          { path: 'diary/:counselingId', element: <CounselingDetail /> }, // 상담 일지 상세
          { path: 'payment', element: <Payment /> },
        ],
      },
      { path: 'createroom', element: <CreateRoom /> },
      { path: 'sharecode', element: <ShareCode /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'mypage', element: <MyPage /> },
    ],
  },
  {
    path: 'user/mypage/terms', // 이용약관인데 유저만 접근 가능하지만, 메뉴바가 없어서 별도로 분리
    element: (
      <ProtectedRoute>
        <UserPolicy />
      </ProtectedRoute>
    ),
  },
]);

export default router;

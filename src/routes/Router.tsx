// router.ts
import { createBrowserRouter } from 'react-router-dom';
import Signup from '../pages/Signup/Signup';
import RoomList from '../pages/Room/RoomList';
import Payment from '../pages/Deposit/Payment';
import Statistics from '../pages/Statistics/Statistics';
import CreateRoom from '../pages/Room/CreateRoom';
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
import ShareCode from '../pages/Room/ShareCode';
import EditHomework from '../pages/Homework/EditHomework';
import EditCounseling from '../pages/Counseling/EditCounseling';
import EditMaterial from '../pages/Material/EditMaterial';
import CreatePayment from '../pages/Deposit/CreatePayment';
import CreateStatistics from '../pages/Statistics/CreateStatistics';
import Splash from '../pages/Common/Splash';
import Login from '../pages/Signup/Login';
import KakaoOauth from '../components/Signup/KakaoOauth';
import ProtectedRoute from '../components/Common/ProtectedRoute';
import Layout from '../components/Common/Layout';
import Invite from '../pages/Room/Invite';
import RoomDetail from '../pages/RoomDetail/RoomDetail';
import Calendar from '../pages/Calendar/Calendar';
import MyPage from '../pages/MyPage/MyPage';
import UserPolicy from '../pages/MyPage/UserPolicy';
import ChatList from '../pages/Chatting/ChatList';
import ChatRoom from '../pages/Chatting/ChatRoom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  { path: 'api/auth/kakao/callback', element: <KakaoOauth /> },
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
        children: [{ path: 'invite/:roomId/:shareCode', element: <Invite /> }],
      },
      {
        path: ':roomId',
        children: [
          { index: true, element: <RoomDetail /> },
          { path: 'edit', element: <EditRoom /> },
          { path: 'materials', element: <Materials /> }, // 강의 자료함
          { path: 'materials/create', element: <CreateMaterials /> }, // 강의 자료 업로드
          { path: 'materials/:materialId', element: <MaterialDetail /> }, // 강의 자료 상세
          { path: 'materials/:materialId/edit', element: <EditMaterial /> }, // 강의 자료 상세
          { path: 'homework', element: <Homework /> }, // 숙제방
          { path: 'homework/create', element: <CreateHomework /> }, // 숙제 업로드
          { path: 'homework/:homeworkId', element: <HomeworkDetail /> }, // 숙제 상세
          { path: 'homework/:homeworkId/edit', element: <EditHomework /> }, // 숙제 상세
          { path: 'stats', element: <Statistics /> }, // 성적 통계
          { path: 'stats/create', element: <CreateStatistics /> }, // 성적 통계 생성
          { path: 'diary', element: <CounselingDiary /> }, // 상담 일지
          { path: 'diary/create', element: <CreateCounseling /> }, // 상담 일지 업로드
          { path: 'diary/:counselingId', element: <CounselingDetail /> }, // 상담 일지 상세
          { path: 'diary/:counselingId/edit', element: <EditCounseling /> }, // 상담 일지 수정
          { path: 'payment', element: <Payment /> }, // 입금 상세
          { path: 'payment/create', element: <CreatePayment /> }, // 입금 상세
        ],
      },
      { path: 'createroom', element: <CreateRoom /> },
      { path: 'sharecode', element: <ShareCode /> },
      { path: 'calendar', element: <Calendar /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'chatList', element: <ChatList /> }, // 채팅 목록
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
  {
    path: 'user/chat/:chatId',
    element: (
      <ProtectedRoute>
        <ChatRoom />
      </ProtectedRoute>
    ),
  },
]);

export default router;

import { useNavigate } from 'react-router-dom';
import KakaoLoginButton from '../components/KakaoLoginButton';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-start px-5 py-4 text-heading6 font-bold leading-10 text-gray-900">
        <div>더욱 더 편리한 과외 플랫폼</div>
        <div>일정 관리부터 과제 제출까지</div>
        <div>편리하게 이용하고 공유해요</div>
      </div>
      <div className="px-4 ">온보딩 일러스트레이션</div>
      <KakaoLoginButton />
    </div>
  );
};

export default Login;

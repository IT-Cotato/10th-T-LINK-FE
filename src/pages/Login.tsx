import KakaoLoginButton from '../components/KakaoLoginButton';
import logingate from '../assets/images/logingate.png';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col items-start px-4 py-6 text-heading6 font-bold leading-10 text-gray-900">
        <div className="text-primary_600">과외의 모든 것, 한 곳에서!</div>
        <div>선생님, 학생, 학부모 모두 티링크에서</div>
        <div>한번에 해결해요!</div>
      </div>
      <div className="px-4 flex justify-center">
        <img className="w-60" src={logingate} alt="logingate" />
      </div>
      <KakaoLoginButton />
    </div>
  );
};

export default Login;

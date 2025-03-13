import KakaoLoginButton from '../../components/Signup/KakaoLoginButton';
import LoginOnboarding from '../../components/Signup/LoginOnboarding';

const Login = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LoginOnboarding />
      <KakaoLoginButton />
    </div>
  );
};

export default Login;

import { useNavigate } from 'react-router-dom';
import KakaoLoginButton from '../components/KakaoLoginButton';

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <KakaoLoginButton />
      <button onClick={() => navigate('/signup')}>회원 가입</button>
    </div>
  );
};

export default Login;

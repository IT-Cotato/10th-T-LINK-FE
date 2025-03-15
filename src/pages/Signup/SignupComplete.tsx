import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Common/Loading';

const SignupComplete = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/user/roomlist');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return <Loading text="T-LINK에 오신 것을 환영합니다!" />;
};

export default SignupComplete;

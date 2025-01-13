import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupComplete = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/user/roomlist');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-start py-4 px-5">
        <h1 className="text-heading6 font-bold text-gray-900 leading-10">T-LINK에 오신 것을 환영합니다!</h1>
        <h3 className="text-body3 font-regular text-gray-600 leading-7">회원가입이 완료되었습니다.</h3>
      </div>
    </div>
  );
};

export default SignupComplete;

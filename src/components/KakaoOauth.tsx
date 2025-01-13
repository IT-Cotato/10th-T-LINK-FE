import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAuthCode } from '../api/auth.api';

const KakaoOauth = () => {
  const navigate = useNavigate();
  const [isProcessed, setIsProcessed] = useState(false);
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  const handleAuth = async () => {
    if (!code) return;

    const { accessToken, refreshToken, status } = await postAuthCode(code);

    if (accessToken) {
      localStorage.setItem('accesstoken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    if (status === 'existing') {
      // 이미 회원인 경우 로그인 완료 -> 메인페이지로 이동
      // navigate('/');
    } else if (status === 'new') {
      // 신규 회원인 경우 -> 회원가입 페이지로 이동
      // navigate('/signup');
    }
    setIsProcessed(true);
  };

  useEffect(() => {
    if (isProcessed) return; // 이미 처리한 경우 return
    handleAuth();
  }, [isProcessed]);

  return <div>회원인지 확인 중입니다.</div>;
};

export default KakaoOauth;

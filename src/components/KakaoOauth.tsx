import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAuthCode } from '../api/auth.api';
import { UserCode } from '../models/user.model';

const KakaoOauth = () => {
  const navigate = useNavigate();
  const [isProcessed, setIsProcessed] = useState(false);
  const [code, setCode] = useState<UserCode | null>(null);

  useEffect(() => {
    const authCode = new URL(window.location.href).searchParams.get('code');
    if (authCode) {
      setCode({
        provider: 'KAKAO',
        redirectUrl: 'http://localhost:5173/api/auth/kakao/callback',
        code: authCode,
      });
    } else {
      console.error('No authorization code found in URL.');
    }
  }, []);

  const handleAuth = async () => {
    if (!code) return;
    try {
      const res = await postAuthCode(code);
      console.log('API 응답:', res.data);
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;
      const isOnboarding = res.data.data.isOnboarding;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      if (!isOnboarding) {
        navigate('/user/roomlist');
      } else {
        navigate('/signup');
      }

      setIsProcessed(true);
    } catch (error) {
      console.error('Authorization failed:', error);
    } finally {
      setIsProcessed(true);
    }
  };

  useEffect(() => {
    if (isProcessed || !code) return; // 이미 처리했거나 code가 없는 경우 return
    handleAuth();
  }, [isProcessed, code]);

  return <div>회원 확인 중입니다. 잠시만 기다려주세요...</div>;
};

export default KakaoOauth;

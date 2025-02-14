import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAuthCode } from '../api/auth.api';
import { UserCode } from '../models/user.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import Loading from '../pages/Loading';

const KakaoOauth = () => {
  const navigate = useNavigate();
  const [isProcessed, setIsProcessed] = useState(false);
  const [code, setCode] = useState<UserCode | null>(null);
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  useEffect(() => {
    const authCode = new URL(window.location.href).searchParams.get('code');
    if (authCode) {
      setCode({
        provider: 'KAKAO',
        redirectUrl: REDIRECT_URI,
        code: authCode,
      });
    } else {
      console.error('인가코드가 존재하지 않습니다.');
    }
  }, []);

  const handleAuth = async () => {
    if (!code) return;
    try {
      const res = await postAuthCode(code);
      if (res.status == 200) {
        const { accessToken, refreshToken, isOnboarding } = res.data.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const decoded = jwtDecode(accessToken) as JwtPayload & { role: string };
        localStorage.setItem('roleInfo', decoded.role);
        console.log(res.data.message);

        if (!isOnboarding) {
          navigate('/user/roomlist');
        } else {
          navigate('/signup');
        }

        setIsProcessed(true);
      }
    } catch (err: any) {
      if (err.response.status === 400 || err.response.status === 500) {
        console.log('오류:', err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (isProcessed || !code) return; // 이미 처리했거나 code가 없는 경우 return
    handleAuth();
  }, [isProcessed, code]);

  return <Loading text="회원 확인 중..." />;
};

export default KakaoOauth;

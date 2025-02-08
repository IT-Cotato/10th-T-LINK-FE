import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAuthCode } from '../api/auth.api';
import { UserCode } from '../models/user.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import loading_logo from '../assets/images/loading_logo.png';

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

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-11">
      <div className="bg-gray-50 rounded-full p-2">
        <img src={loading_logo} className="w-8 h-8" />
      </div>
      <div>
        <h1 className="font-bold text-2xl leading-10">회원 확인 중...</h1>
        <h1 className="text-gray-600 font-normal text-base leading-7 ">잠시만 기다려주세요!</h1>
      </div>
    </div>
  );
};

export default KakaoOauth;

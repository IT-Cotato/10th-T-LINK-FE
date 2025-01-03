import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoOauth = () => {
  const navigate = useNavigate();
  const [isProcessed, setIsProcessed] = useState(false);
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);

  const sendAuthCodeToServer = async () => {
    try {
      const res = await axios.post(
        '백에서 주는 url입력',
        { code },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const accessToken = res.data.accessToken; // 수정할수도
      const status = res.data.status; // 백에서 회원인지 확인하고 알려준 값
      console.log(accessToken); // 확인
      console.log(status);
      if (status === 'existing') {
        // 이미 회원인 경우 로그인 완료 -> 메인페이지로 이동
        // navigate('/');
      } else if (status === 'new') {
        // 신규 회원인 경우 -> 회원가입 페이지로 이동
        navigate('/signup');
      }
    } catch (err) {
      console.log(`로그인 실패: ${err}`);
      // navigate('/login');
    } finally {
      setIsProcessed(true);
    }
  };

  useEffect(() => {
    if (isProcessed) return; // 이미 처리한 경우 return

    if (code) {
      sendAuthCodeToServer();
    }
  }, [code, isProcessed]);

  return <div>회원인지 확인 중입니다.</div>;
};

export default KakaoOauth;

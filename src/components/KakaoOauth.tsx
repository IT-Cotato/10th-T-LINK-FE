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
      console.log(accessToken); // 확인
      // navigate('/');
    } catch (err) {
      console.log(`로그인 실패: ${err}`);
      // navigate('/login');
    }
  };

  useEffect(() => {
    if (isProcessed) return; // 이미 처리한 경우 return

    if (code) {
      sendAuthCodeToServer();
    }
    setIsProcessed(true);
  }, [code, isProcessed]);

  return <div>로그인 중입니다.</div>;
};

export default KakaoOauth;

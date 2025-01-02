import kakao_login from '../assets/images/kakao_login.png';

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div>
      <button className="bg-transparent" onClick={handleKakaoLogin}>
        <img alt="카카오 로그인" src={kakao_login} />
      </button>
    </div>
  );
};
export default KakaoLoginButton;

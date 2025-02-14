import kakao_logo from '../assets/images/Kakao_logo.png';

const KakaoLoginButton = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };

  return (
    <div className="flex px-4 py-6 justify-center fixed bottom-0 max-w-[500px] w-full">
      <button
        className="flex px-3.5 py-3 justify-center items-center flex-1 rounded-md bg-kakao"
        onClick={handleKakaoLogin}
      >
        <div className="flex justify-center items-center gap-2 px-6">
          <img className="w-4 h-4" alt="카카오 로그인" src={kakao_logo} />
          <h3 className="text-[15px] font-semibold leading-[22px]">카카오로 계속하기</h3>
        </div>
      </button>
    </div>
  );
};
export default KakaoLoginButton;

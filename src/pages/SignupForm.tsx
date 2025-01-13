import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUserInfo } from '../api/auth.api';
import Header from '../components/Header';
import { UserInfo } from '../models/user.model';

const SignupForm = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState<UserInfo>({
    role: '',
    username: '',
    phoneNumber: '',
    birthday: '',
  });

  useEffect(() => {
    const roleInfo = localStorage.getItem('roleInfo');
    if (roleInfo) setUserInput({ ...userInput, role: roleInfo });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };
  console.log(userInput);

  const handleStart = async () => {
    const status = await postUserInfo(userInput);
    console.log(status);
    navigate('/회원가입 완료 페이지');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-start py-4 px-5">
        <h1 className="text-heading6 font-bold text-gray-900 leading-10">T-LINK에 오신 것을 환영합니다!</h1>
        <h3 className="text-body3 font-regular text-gray-600 leading-7">회원가입 정보를 입력해주세요.</h3>
      </div>
      <div className="flex flex-col items-start py-6 px-4 gap-4">
        <input placeholder="이름을 작성해주세요" value={userInput.username} id="username" onChange={handleChange} />
        <input
          placeholder="전화번호를 작성해주세요"
          value={userInput.phoneNumber}
          id="phoneNumber"
          onChange={handleChange}
        />
      </div>
      <div className="px-5 py-6 flex justify-center fixed bottom-0 max-w-[500px] w-full">
        <button
          className="flex-1 px-4 py-3.5 text-gray-500 bg-gray-100 enabled:text-white enabled:bg-primary_700 font-semibold"
          onClick={handleStart}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default SignupForm;

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUserInfo } from '../api/auth.api';
import Header from '../components/Header';
import { UserInfo } from '../models/user.model';

const SignupForm = () => {
  const navigate = useNavigate();
  const [genders, setGenders] = useState([
    {
      id: 0,
      type: '남',
      isClicked: false,
    },
    {
      id: 1,
      type: '여',
      isClicked: false,
    },
  ]);
  const [userInput, setUserInput] = useState<UserInfo>({
    role: '',
    username: '',
    phoneNumber: '',
    gender: '',
  });

  useEffect(() => {
    const roleInfo = localStorage.getItem('roleInfo');
    if (roleInfo) setUserInput({ ...userInput, role: roleInfo });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };
  console.log(userInput);
  console.log(genders);

  const handleStart = async () => {
    const status = await postUserInfo(userInput);
    console.log(status);
    navigate('/signupcomplete');
  };

  const handleGenderClick = (type: string) => {
    setGenders(
      genders.map((gender) =>
        gender.type === type ? { ...gender, isClicked: true } : { ...gender, isClicked: false },
      ),
    );
    setUserInput({ ...userInput, gender: type });
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
        <div className="flex gap-6">
          {genders.map((gender) => (
            <button
              className={`${gender.isClicked ? 'bg-gray-500' : 'bg-white'}`}
              onClick={() => handleGenderClick(gender.type)}
            >
              {gender.type}
            </button>
          ))}
        </div>
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

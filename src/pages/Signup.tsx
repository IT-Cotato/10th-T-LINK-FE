import instance from '../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUserInfo } from '../api/authApi';

import Header from '../components/Header';
import RoleSelectionButton from '../components/RoleSelectionButton';
import { RoleList } from '../utils/RoleList';

const Signup = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  /*const sendInfoToServer = async () => {
    const data = await postUserInfo(userInfo);
    console.log(data);
    navigate('/');
  };
  */

  const handleStart = () => {
    if (!role) return;

    console.log(`선택한 역할: ${role}`);
    // navigate(이름, 전화번호 입력하는 페이지)
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-start py-4 px-5">
        <h1 className="text-heading6 font-bold text-gray-900 leading-10">어디로 링크할까요?</h1>
        <h3 className="text-body3 font-regular text-gray-600 leading-7">선택하신 정보에 따라 화면이 달라져요!</h3>
      </div>
      <div className="flex flex-col items-start py-6 px-4 gap-4">
        {RoleList.map((item) => (
          <RoleSelectionButton
            key={item.id}
            role={item}
            onSelect={() => setRole(item.role)}
            isSelected={role === item.role}
          />
        ))}
      </div>
      <div className="flex-grow" />
      <div className="px-5 py-6 flex justify-center fixed bottom-0 max-w-[500px] w-full">
        <button
          disabled={!role}
          className="flex-1 px-4 py-3.5 text-gray-500 bg-gray-100 enabled:text-white enabled:bg-primary_700 font-semibold"
          onClick={handleStart}
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default Signup;

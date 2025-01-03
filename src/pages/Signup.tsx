import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import RoleSelectionButton from '../components/RoleSelectionButton';
import { RoleList } from '../utils/RoleList';

const Signup = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const sendRoleToServer = async () => {
    try {
      const res = await axios.post('백에서 주는 url입력', { role });
      const data = res.data;
      console.log(data);
      navigate('/');
    } catch (err) {
      console.log(`회원가입 실패: ${err}`);
    }
  };

  const handleStart = () => {
    if (!role) return;

    console.log(`선택한 역할: ${role}`);
    sendRoleToServer();
  };

  return (
    <div className="flex flex-col px-5">
      <Header />
      <div className="flex flex-col py-4">
        <h1 className="text-heading6 font-bold text-gray-900">어디로 링크할까요?</h1>
        <h3 className="text-body3 font-regular text-gray-600">선택하신 정보에 따라 화면이 달라져요!</h3>
      </div>
      <div className="flex flex-col py-6 gap-4 cursor-pointer">
        {RoleList.map((item) => (
          <RoleSelectionButton
            key={item.id}
            role={item}
            onSelect={() => setRole(item.role)}
            isSelected={role === item.role}
          />
        ))}
      </div>
      <button disabled={!role} className="text-gray-400" onClick={handleStart}>
        시작하기
      </button>
    </div>
  );
};

export default Signup;

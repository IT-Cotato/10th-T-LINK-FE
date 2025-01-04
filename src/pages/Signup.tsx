import instance from '../api/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRole } from '../api/authAPI';

import Header from '../components/Header';
import RoleSelectionButton from '../components/RoleSelectionButton';
import { RoleList } from '../utils/RoleList';

const Signup = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const sendRoleToServer = async () => {
    const data = await postRole(role);
    console.log(data);
    navigate('/');
  };

  const handleStart = () => {
    if (!role) return;

    console.log(`선택한 역할: ${role}`);
    sendRoleToServer();
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col px-5">
        <div className="flex flex-col justify-between py-4 h-24">
          <h1 className="text-heading6 font-bold text-gray-900">어디로 링크할까요?</h1>
          <h3 className="text-body3 font-regular text-gray-600">선택하신 정보에 따라 화면이 달라져요!</h3>
        </div>
        <div className="flex flex-col py-6 gap-4 cursor-pointer mb-40">
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
    </div>
  );
};

export default Signup;

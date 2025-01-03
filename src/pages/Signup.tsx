import { useState } from 'react';
import Header from '../components/Header';
import RoleSelectionButton from '../components/RoleSelectionButton';
const Signup = () => {
  const [role, setRole] = useState('');
  return (
    <div className="flex flex-col">
      <Header />
      <h1>어디로 링크할까요?</h1>
      <h3>선택하신 정보에 따라 화면이 달라져요!</h3>
      <RoleSelectionButton />
      <RoleSelectionButton />
      <RoleSelectionButton />
    </div>
  );
};

export default Signup;

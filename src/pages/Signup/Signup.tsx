import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Common/Header';
import RoleSelectionButton from '../../components/Signup/RoleSelectionButton';
import { RoleList } from '../../utils/RoleList';
import LongButton from '../../components/Common/LongButton';
import CreateDesc from '../../components/RoomDetail/CreateDesc';

const Signup = () => {
  const [role, setRole] = useState('');
  const navigate = useNavigate();
  const handleStart = () => {
    if (!role) return;

    console.log(`선택한 역할: ${role}`);
    navigate('/formbasic', {
      state: {
        role: role,
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="px-5">
        <CreateDesc title="어디로 링크할까요?" desc="선택하신 정보에 따라 화면이 달라져요!" />

        <div className="flex flex-col items-start py-6 gap-4">
          {RoleList.map((item) => (
            <RoleSelectionButton
              key={item.id}
              role={item}
              onSelect={() => setRole(item.type)}
              isSelected={role === item.type}
            />
          ))}
        </div>
      </div>

      <div className="px-5 py-6 flex justify-center fixed bottom-0 max-w-[500px] w-full">
        <LongButton onClick={handleStart} text="시작하기" enable={role ? true : false} />
      </div>
    </div>
  );
};

export default Signup;

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/Common/Header';
import SignupTitle from '../../components/Signup/SignupTitle';
import LongButton from '../../components/Common/LongButton';
import SignupInput from '../../components/Signup/SignupInput';
import GenderButton from '../../components/Signup/GenderButton';

const FormBasic = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [genders, setGenders] = useState([
    {
      id: 0,
      type: '남성',
      isClicked: false,
    },
    {
      id: 1,
      type: '여성',
      isClicked: false,
    },
  ]);

  const [role, setRole] = useState([]);
  const [basicInput, setBasicInput] = useState({
    username: '',
    gender: '',
  });

  useEffect(() => {
    setRole(location.state?.role);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicInput({ ...basicInput, [e.target.id]: e.target.value });
  };

  const handleStart = async () => {
    navigate('/formtel', {
      state: {
        role: role,
        username: basicInput.username,
        gender: basicInput.gender,
      },
    });
  };

  const handleGenderClick = (type: string) => {
    setGenders(
      genders.map((gender) =>
        gender.type === type ? { ...gender, isClicked: true } : { ...gender, isClicked: false },
      ),
    );
    setBasicInput({ ...basicInput, gender: type });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SignupTitle title1="정보를 입력해주세요" title2="티링크를 이용하면서 보여질 정보예요!" />

      <div className="flex items-start px-4 py-2 gap-2">
        {genders.map((gender) => (
          <GenderButton gender={gender} handleClick={handleGenderClick} />
        ))}
      </div>

      <SignupInput
        handleChange={handleChange}
        placeholder="이름을 작성해주세요"
        value={basicInput.username}
        id="username"
      />

      <div className="px-5 py-6 flex justify-center fixed bottom-0 max-w-[500px] w-full">
        <LongButton
          onClick={handleStart}
          text="다음"
          enable={Object.values(basicInput).every((value) => value !== '')}
        />
      </div>
    </div>
  );
};

export default FormBasic;

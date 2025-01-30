import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const FormBasic = () => {
  const navigate = useNavigate();
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
  const [basicInput, setBasicInput] = useState({
    username: '',
    gender: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBasicInput({ ...basicInput, [e.target.id]: e.target.value });
  };

  const handleStart = async () => {
    navigate('/formtel', {
      state: {
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
      <div className="flex flex-col items-start py-4 px-5">
        <h1 className="text-heading6 font-bold text-gray-900 leading-10">정보를 입력해주세요</h1>
        <h3 className="text-body3 font-regular text-gray-600 leading-7">티링크를 이용하면서 보여질 정보예요!</h3>
      </div>
      <div className="flex flex-col items-start p-4 gap-6">
        <div className="flex gap-2">
          {genders.map((gender) => (
            <button
              key={gender.id}
              className={`flex justify-center items-center px-4 py-2.5 font-semibold rounded-3xl border-2 ${gender.isClicked ? 'bg-white  text-primary_600 border-primary_600' : 'bg-gray-100 text-gray-500 border-gray-100'}`}
              onClick={() => handleGenderClick(gender.type)}
            >
              {gender.type}
            </button>
          ))}
        </div>
        <input
          className="flex items-start gap-1.5 w-full px-3 py-2 border-2 border-gray-300 rounded-md"
          placeholder="이름을 작성해주세요"
          value={basicInput.username}
          id="username"
          onChange={handleChange}
        />
      </div>
      <div className="px-5 py-6 flex justify-center fixed bottom-0 max-w-[500px] w-full">
        <button
          disabled={Object.values(basicInput).some((value) => value === '')}
          className="flex-1 px-4 py-3.5 text-gray-500 bg-gray-100 enabled:text-white enabled:bg-primary_700 font-semibold"
          onClick={handleStart}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default FormBasic;

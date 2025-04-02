import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postUserInfo } from '../../api/auth.api';
import Header from '../../components/Common/Header';
import { UserInfo } from '../../models/user.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import LongButton from '../../components/Common/LongButton';
import SignupInput from '../../components/Signup/SignupInput';
import CreateDesc from '../../components/RoomDetail/CreateDesc';

const FormTel = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userInput, setUserInput] = useState<UserInfo>({
    role: '',
    username: '',
    phoneNumber: '',
    gender: '',
  });

  useEffect(() => {
    const role = location.state?.role;
    const username = location.state?.username;
    const gender = location.state?.gender;

    if (role) setUserInput({ ...userInput, role: role, username: username, gender: gender });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  const handleStart = async () => {
    const res = await postUserInfo(userInput);
    if (res.status == 200) {
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const decoded = jwtDecode(accessToken) as JwtPayload & { role: string };
      localStorage.setItem('roleInfo', decoded.role);
    }

    navigate('/signupcomplete');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="px-5">
        <CreateDesc
          title="전화번호를 입력해주세요"
          desc="입력하신 정보는 서비스 내에서만 사용돼요!"
        />

        <SignupInput
          handleChange={handleChange}
          placeholder="01012341234"
          value={userInput.phoneNumber}
          id="phoneNumber"
        />
      </div>

      <div className="px-5 py-6 flex justify-center fixed bottom-0 max-w-[500px] w-full">
        <LongButton onClick={handleStart} text="완료" enable={userInput.phoneNumber.length == 11} />
      </div>
    </div>
  );
};

export default FormTel;

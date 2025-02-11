import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postUserInfo } from '../../api/auth.api';
import Header from '../../components/Header';
import { UserInfo } from '../../models/user.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';

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
  console.log(userInput);

  const handleStart = async () => {
    try {
      const res = await postUserInfo(userInput);
      if (res.status == 200) {
        const accessToken = res.data.data.accessToken;
        const refreshToken = res.data.data.refreshToken;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        const decoded = jwtDecode(accessToken) as JwtPayload & { role: string };
        localStorage.setItem('roleInfo', decoded.role);
        console.log(res.data.message);
      }
    } catch (err: any) {
      if (err.response.status === 400 || err.response.status === 401 || err.response.status === 404) {
        console.log('오류:', err.response.data.error);
      } else {
        console.log(err);
      }
    } finally {
      navigate('/signupcomplete');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-start py-4 px-5">
        <h1 className="text-heading6 font-bold text-gray-900 leading-10">전화번호를 입력해주세요</h1>
        <h3 className="text-body3 font-regular text-gray-600 leading-7">입력하신 정보는 서비스 내에서만 사용돼요!</h3>
      </div>
      <div className="flex flex-col items-start py-6 px-4 gap-4">
        <input
          className="flex items-start gap-1.5 w-full px-3 py-2 border-2 border-gray-300 rounded-md"
          placeholder="01012341234"
          value={userInput.phoneNumber}
          id="phoneNumber"
          onChange={handleChange}
        />
      </div>
      <div className="px-5 py-6 flex justify-center fixed bottom-0 max-w-[500px] w-full">
        <button
          disabled={userInput.phoneNumber.length !== 11}
          className="flex-1 px-4 py-3.5 text-gray-500 bg-gray-100 enabled:text-white enabled:bg-primary_700 font-semibold"
          onClick={handleStart}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default FormTel;

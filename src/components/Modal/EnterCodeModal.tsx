import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const EnterCodeModal = () => {
  const navigation = useNavigate();
  const [code, setCode] = useState('');

  const { roomId } = useParams();
  const roleInfo = localStorage.getItem('roleInfo');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleAccept = async () => {
    if (!code) return;
    navigation(`/user/roomlist/invite/${roomId}/${code}`);
  };

  return roleInfo === 'STUDENT' || roleInfo === 'PARENT' ? (
    <div className="flex flex-col p-4 gap-4 w-[320px] bg-white rounded-[16px]">
      <div className="text-center font-semibold text-lg leading-8">과외방 참여</div>
      <div className="text-center font-normal text-sm leading-8 text-gray-600">
        참여 코드를 입력해주세요.
      </div>

      <div className="flex flex-1 flex-col justify-center w-full gap-1.5">
        <input
          value={code}
          placeholder="참여 코드를 입력해주세요"
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-3"
        />
      </div>

      <div className="flex justify-center gap-4 w-full font-semibold text-base">
        <button
          className="w-full bg-primary_700 text-white rounded-full py-3.5"
          onClick={handleAccept}
        >
          완료
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col p-4 gap-6 w-[320px] bg-white rounded-[16px]">
      <div className="text-center font-semibold text-lg leading-8">
        과외방에 입장할 수 없습니다.
      </div>
      <div className="flex justify-center gap-4 w-full font-semibold text-base">
        <button
          className="w-full border border-gray-500 rounded-[4px] py-3.5"
          onClick={() => navigation('/user/roomlist')}
        >
          창닫기
        </button>
      </div>
    </div>
  );
};

export default EnterCodeModal;

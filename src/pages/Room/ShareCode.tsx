import { useEffect, useState } from 'react';
import { getShareCode } from '../../api/roomList.api';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';

const ShareCode = () => {
  const location = useLocation();
  const navigation = useNavigate();

  const [code, setCode] = useState('');
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const roomId = location.state.roomId;
    console.log(roomId);
    setCode(`http://localhost:5173/user/roomlist/invite/${roomId}`);
  }, []);

  const handleCopy = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setToast(true);
    } catch (e) {
      alert('failed');
    }
  };

  const handleSubmit = () => {
    navigation('/user/roomlist');
  };

  return (
    <div className="flex py-5 flex-col h-full justify-center items-center ">
      <div className="flex flex-col items-center border-2 p-5">
        <h1>과외방 링크</h1>
        <h1>학생에게 참여링크를 공유 해주세요</h1>
        <button onClick={() => handleCopy(code)}>링크 복사 버튼</button>
        {toast && <Toast setToast={setToast} />}
        <button onClick={() => handleSubmit()} className="text-white bg-black">
          완료
        </button>
      </div>
    </div>
  );
};

export default ShareCode;

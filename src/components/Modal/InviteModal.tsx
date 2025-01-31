import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const InviteModal = ({ setModalOpen, id }: ModalProps) => {
  const navigation = useNavigate();
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');
  const handleAccept = () => {
    /* '네"를 눌렀을 때
    학생 Id, 방 Id(이건 백에서 정해주세요)를 넘겨주면 백에서 학생이 이미 들어가있는지 확인 후 
    백 -> 프론트 경우 나눠서 알려줌

    // 이미 들어가 있는 경우
    if(status) {
    setMessage("이미 초대 되었습니다.");
    }
    // 안 들어간 경우
    else {
    setMessage("초대 완료 되었습니다.");
    }

    navigation('/user/roomlist');
    */
  };

  return (
    <div className="flex flex-col py-5 w-1/3 min-w-[300px] h-1/5 bg-white rounded-[16px]">
      <div className="flex flex-1 flex-col justify-center items-center">
        oo님이 과외방으로 초대하셨습니다. <br /> 입장하시겠습니까?
      </div>
      <div className="flex justify-center gap-32 w-full">
        <button onClick={handleAccept}>네</button>
        <button onClick={() => navigation('/user/roomlist')}>아니요</button>
      </div>
    </div>
  );
};

export default InviteModal;

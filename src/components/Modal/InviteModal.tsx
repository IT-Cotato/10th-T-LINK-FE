import { useNavigate, useParams } from 'react-router-dom';
import { postShareCode } from '../../api/roomList.api';

type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const InviteModal = ({ setModalOpen, id }: ModalProps) => {
  const navigation = useNavigate();
  const { shareCode } = useParams();

  const handleAccept = async () => {
    if (!shareCode) return;

    try {
      const res = await postShareCode(shareCode);
      console.log(res);
      // navigation('/user/roomlist');
    } catch (e: any) {
      if (e.response.status === 401 || e.response.status === 404) console.log('오류:', e.response.data.error);
      else {
        console.log(e);
      }
    }

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
};

export default InviteModal;

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteRoom } from '../../api/roomList.api';
import Toast from '../Toast';

interface RoomDeleteProps {
  setModalOpen: (value: boolean) => void;
}

const RoomDelteModal = ({ setModalOpen }: RoomDeleteProps) => {
  const { roomId } = useParams();
  const [toast, setToast] = useState(false);

  const navigate = useNavigate();
  const handleDelete = async (roomId: number) => {
    try {
      const res = await deleteRoom(roomId);
      console.log(res);
      if (res.status === 200) {
        setModalOpen(false);
        navigate('/user/roomlist', { state: { toast: true } });
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };
  return (
    <>
      <div className="w-[320px] p-4 flex flex-col rounded-2xl items-center justify-center gap-8 bg-white">
        <div className="font-semibold text-lg leading-8">
          <p>해당 과외방을 삭제하시겠습니까?</p>
          <p>삭제 시 저장하셨던 정보가 사라집니다.</p>
        </div>
        <div className="flex w-full gap-3 text-[16px] font-semibold">
          <button
            className="flex-1 py-[14px] bg-sub1_40 text-white rounded-[4px] box-border text-center"
            onClick={() => handleDelete(Number(roomId))}
          >
            삭제
          </button>
          <button
            className="flex-1 py-[14px] bg-white text-black border border-gray-500 rounded-[4px] box-border text-center"
            onClick={() => setModalOpen(false)}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default RoomDelteModal;

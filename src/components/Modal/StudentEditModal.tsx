import { useEffect, useState } from 'react';
import { getCurrentRoomInfo, patchRoomName } from '../../api/roomList.api';

type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  name: string;
};

const StudentEditModal = ({ setModalOpen, name, id }: ModalProps) => {
  const [roomName, setRoomName] = useState(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      console.log(roomName);
      console.log(id);
      const res = await patchRoomName(id, roomName);
      console.log(res);
    } catch (err: any) {
      if (err.response.status === 400 || err.response.status === 500) {
        console.log('오류:', err.response.data.error);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div
      className="flex flex-col py-5 w-1/3 min-w-[300px] h-3/5 bg-primary_100 rounded-[16px]"
      onClick={(e) => e.stopPropagation()} // 닫힘 방지
    >
      <div className="flex flex-1 flex-col justify-center items-center">
        <input value={roomName} onChange={handleChange}></input>
      </div>
      <div className="flex justify-center gap-32 w-full">
        <button onClick={() => setModalOpen(false)}>취소</button>
        <button onClick={handleUpdate}>저장</button>
      </div>
    </div>
  );
};

export default StudentEditModal;

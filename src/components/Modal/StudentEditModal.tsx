import { useEffect, useState } from 'react';
import { patchRoomName } from '../../api/roomList.api'; // getCurrentRoomInfo 제거
import { RoomName } from '../../models/room.model';

type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  name: string;
  setWillUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentEditModal = ({ setModalOpen, setWillUpdate, name, id }: ModalProps) => {
  const [roomName, setRoomName] = useState(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleUpdate = async () => {
    try {
      const roomData: RoomName = { roomName };
      const res = await patchRoomName(id, roomData);
    } catch (err: any) {
      if (err.response?.status === 400 || err.response?.status === 500) {
        console.log('오류:', err.response.data.error);
      } else {
        console.log(err);
      }
    } finally {
      setModalOpen(false);
      setWillUpdate(true);
    }
  };

  return (
    <div
      className="flex flex-col py-5 w-1/3 min-w-[300px] h-3/5 bg-primary_100 rounded-[16px]"
      onClick={(e) => e.stopPropagation()} // 닫힘 방지
    >
      <div className="flex flex-1 flex-col justify-center items-center">
        {/* roomName 상태값을 input value로 설정 */}
        <input value={roomName} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-4/5" />
      </div>
      <div className="flex justify-center gap-4 w-full mt-4">
        {/* 취소 버튼 */}
        <button onClick={() => setModalOpen(false)} className="bg-gray-300 rounded-md px-4 py-2">
          취소
        </button>
        {/* 저장 버튼 */}
        <button onClick={handleUpdate} className="bg-blue-500 text-white rounded-md px-4 py-2">
          저장
        </button>
      </div>
    </div>
  );
};

export default StudentEditModal;

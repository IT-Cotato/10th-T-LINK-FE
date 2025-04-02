import { useState } from 'react';
import { patchRoomName } from '../../api/roomList.api'; // getCurrentRoomInfo 제거
import { RoomName } from '../../models/room.model';
import { IoClose } from 'react-icons/io5';

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

  const handleUpdate = () => {
    const roomData: RoomName = { roomName };
    patchRoomName(id, roomData).then(() => {
      setModalOpen(false);
      setWillUpdate(true);
    });
  };

  return (
    <div
      className="flex w-[320px] flex-col p-4 gap-6 bg-white rounded-[16px]"
      onClick={(e) => e.stopPropagation()} // 닫힘 방지
    >
      <div className="flex items-center justify-between">
        <div className="w-4" />
        <h1 className="font-semibold text-lg leading-8">과외방 이름 수정하기</h1>
        <IoClose size={20} onClick={() => setModalOpen(false)} />
      </div>

      <div className="flex flex-1 flex-col justify-center w-full gap-1.5">
        {/* roomName 상태값을 input value로 설정 */}
        <h1 className="font-medium text-sm leading-[26px]">과외방 이름</h1>
        <input
          value={roomName}
          onChange={handleChange}
          className="border border-gray-300 rounded-md py-2 px-3"
        />
      </div>
      <div className="flex justify-center gap-4 w-full font-semibold text-base">
        {/* 수정하기 버튼 */}
        <button
          onClick={handleUpdate}
          className="w-full bg-primary_700 text-white rounded-[4px] py-3.5"
        >
          수정하기
        </button>
        {/* 취소 버튼 */}
        <button
          onClick={() => setModalOpen(false)}
          className="w-full border border-gray-500 rounded-[4px] py-3.5"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default StudentEditModal;

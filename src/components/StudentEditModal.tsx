import { useEffect, useState } from 'react';

type ModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

const StudentEditModal = ({ setModalOpen, id }: ModalProps) => {
  const [roomName, setRoomName] = useState('방이름');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  /*
  useEffect(() => {
    const fetchRoomName = async () => {
      const currentRoomName = await getCurrentRoomInfo(paramsId);
      setRoomName(currentRoomName);
    };
    fetchRoomName();
  }, []);

  const handleUpdate = async () => {
    const status = await patchRoomName(paramsId, roomName);
    if (status===200) setModalOpen(false);
  };
  */

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
      onClick={() => setModalOpen(false)} // 닫힘
    >
      <div
        className="absolute top-10 flex flex-col py-5 w-1/3 h-3/5 bg-primary_100 rounded-[16px]"
        onClick={(e) => e.stopPropagation()} // 닫힘 방지
      >
        <div className="flex flex-1 flex-col justify-center items-center">
          <input value={roomName} onChange={handleChange}></input>
        </div>
        <div className="flex justify-center gap-32 w-full">
          <button onClick={() => setModalOpen(false)}>취소</button>
          <button>저장</button>
        </div>
      </div>
    </div>
  );
};

export default StudentEditModal;

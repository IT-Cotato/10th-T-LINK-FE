import { FaAngleRight } from 'react-icons/fa6';
import edit from '../assets/images/edit.png';
import { SimpleRoomInfo } from '../models/room.model';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import StudentEditModal from './Modal/StudentEditModal';
import Modal from './Modal/Modal';
import RoomInfoContent from './RoomInfoContent';

type RoomProps = {
  room: SimpleRoomInfo;
  roleInfo: string;
  setWillUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const RoomInfo = ({ room, roleInfo, setWillUpdate }: RoomProps) => {
  const [StudentEditOpen, setStudentEditOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    if (roleInfo === 'TEACHER') navigate(`/user/${room.roomId}/edit`);
    else if (roleInfo === 'STUDENT' || 'PARENT') setStudentEditOpen(true);
  };

  return (
    <div className="flex items-center p-4">
      {StudentEditOpen && (
        <Modal onClose={() => setStudentEditOpen(false)}>
          <StudentEditModal
            setModalOpen={setStudentEditOpen}
            id={room.roomId}
            name={room.roomName}
            setWillUpdate={setWillUpdate}
          />
        </Modal>
      )}

      <RoomInfoContent room={room} roleInfo={roleInfo} />
      <div className="flex gap-3 items-center cursor-pointer">
        {(roleInfo == 'STUDENT' || roleInfo == 'PARENT') && (
          <div onClick={handleEdit}>
            <img src={edit} className="w-7 h-7" />
          </div>
        )}
        <FaAngleRight size={20} color="#C6C4C1" onClick={() => navigate(`/user/${room.roomId}`)} />
      </div>
    </div>
  );
};

export default RoomInfo;

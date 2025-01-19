import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { SimpleRoomInfo } from '../models/room.model';
import { useNavigate } from 'react-router-dom';
import student_boy from '../assets/images/student_boy.png';
import student_girl from '../assets/images/student_girl.png';
import ProfileModal from './ProfileModal';
import { useState } from 'react';

type RoomProps = {
  room: SimpleRoomInfo;
  handleDelete: (roomId: number) => void;
};

const RoomInfo = ({ room, handleDelete }: RoomProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center py-2.5 gap-4 px-4">
      {modalOpen && <ProfileModal setModalOpen={setModalOpen} id={room.student.studentId} />}
      <div
        className="flex items-center p-1.5 cursor-pointer"
        onClick={() => setModalOpen(true)}
        style={{ backgroundColor: room.student.backgroundColor }}
      >
        {room.student.gender === '남' ? (
          <img className="w-9 h-9" src={student_boy} />
        ) : (
          <img className="w-9 h-9" src={student_girl} />
        )}
      </div>
      <div className="flex flex-1 flex-col text-gray-900 cursor-pointer" onClick={() => navigate(`${room.roomId}`)}>
        <h1 className="text-body1 font-bold leading-9">
          [{room.subject}] {room.roomName}
        </h1>
        <div className="flex gap-3">
          <h3 className="text-body4 font-regular leading-6 gap-4">{room.studentName}</h3>
          <h3> {room.lessonDays.map((lessonDay) => `#${lessonDay.lessonDay}요일`)}</h3>
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => navigate(`${room.roomId}/edit`)}>
        <CiEdit size={20} />
      </div>
      <div className="cursor-pointer" onClick={() => handleDelete(room.roomId)}>
        <MdDeleteOutline size={20} />
      </div>
    </div>
  );
};

export default RoomInfo;

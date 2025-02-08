import { FaAngleRight } from 'react-icons/fa6';
import edit from '../assets/images/edit.png';

import { SimpleRoomInfo } from '../models/room.model';
import { useNavigate } from 'react-router-dom';
import student_boy from '../assets/images/student_boy.png';
import student_girl from '../assets/images/student_girl.png';
import ProfileModal from './Modal/ProfileModal';
import { useEffect, useState } from 'react';
import StudentEditModal from './Modal/StudentEditModal';
import Modal from './Modal/Modal';

type RoomProps = {
  room: SimpleRoomInfo;
  roleInfo: string;
};

const RoomInfo = ({ room, roleInfo }: RoomProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [StudentEditOpen, setStudentEditOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    if (roleInfo === 'TEACHER') navigate(`/user/${room.roomId}/edit`);
    else if (roleInfo === 'STUDENT' || 'PARENT') setStudentEditOpen(true);
  };
  useEffect(() => {
    if (room.roomId % 3 == 0) room.oponent.backgroundColor = '#E1F5D6';
    else if (room.roomId % 3 == 1) room.oponent.backgroundColor = '#FFF6CC';
    else if (room.roomId % 3 == 2) room.oponent.backgroundColor = '#FFE5E5';
  });

  return (
    <div className="flex items-center p-4">
      {profileOpen && (
        <Modal
          onClose={() => {
            setProfileOpen(false);
          }}
        >
          <ProfileModal setModalOpen={setProfileOpen} id={room.oponent.id} />
        </Modal>
      )}
      {StudentEditOpen && (
        <Modal onClose={() => setStudentEditOpen(false)}>
          <StudentEditModal setModalOpen={setStudentEditOpen} id={room.roomId} />
        </Modal>
      )}
      <div className="gap-4 flex flex-1 items-center">
        <div
          className="flex items-center p-3 rounded-2xl cursor-pointer"
          onClick={() => setProfileOpen(true)}
          style={{ backgroundColor: room.oponent.backgroundColor }}
        >
          {room.oponent.gender === '남성' ? (
            <img className="w-9 h-9" src={student_boy} />
          ) : (
            <img className="w-9 h-9" src={student_girl} />
          )}
        </div>
        <div className="flex flex-col text-gray-900 cursor-pointer" onClick={() => navigate(`/user/${room.roomId}`)}>
          <h1 className="text-base font-semibold leading-7">{room.roomName}</h1>
          <div className="flex gap-1.5 text-body4 leading-7 font-medium">
            <div className="flex">
              <h3 className="text-gray-500">#</h3>
              <h3 className="text-primary_700 ">{room.subject}</h3>
            </div>
            {room.lessonDays.map((lessonDay, idx) => (
              <div className="flex" key={idx}>
                <h3 className="text-gray-500">#</h3>
                <h3 className="text-primary_700">{lessonDay.lessonDay}</h3>
              </div>
            ))}
          </div>
          <div className="flex gap-1 text-sm">
            <h3>{room.oponent.name}</h3>
            {roleInfo === 'TEACHER' ? (
              <h3 className="text-gray-500">학생</h3>
            ) : (
              <h3 className="text-gray-500">선생님</h3>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center cursor-pointer">
        <div onClick={handleEdit}>
          <img src={edit} className="w-7 h-7" />
        </div>
        <FaAngleRight size={20} color="#C6C4C1" onClick={() => navigate(`/user/${room.roomId}`)} />
      </div>
    </div>
  );
};

export default RoomInfo;

import { useNavigate } from 'react-router-dom';
import RoomInfo from '../components/RoomInfo';
import { useEffect, useState } from 'react';
import { getRoomList, deleteRoom } from '../api/roomList.api';
import { SimpleRoomInfo } from '../models/room.model';
import InviteModal from '../components/Modal/InviteModal';
import Modal from '../components/Modal/Modal';

const mockData = [
  {
    roomId: 1,
    roomName: '방1',
    studentName: '학생 1',
    subject: '과목1',
    lessonDays: [
      {
        lessonDay: '월',
      },
      {
        lessonDay: '수',
      },
    ],
    student: {
      studentId: 32,
      gender: '남',
      backgroundColor: '#000957',
    },
  },
  {
    roomId: 2,
    roomName: '방2',
    studentName: '학생 2',
    subject: '과목2',
    lessonDays: [
      {
        lessonDay: '금',
      },
      {
        lessonDay: '토',
      },
      {
        lessonDay: '일',
      },
    ],
    student: {
      studentId: 45,
      gender: '여',
      backgroundColor: '#ffffff',
    },
  },
];

const Invite = () => {
  // const roleInfo = localStorage.getItem('roleInfo');
  const roleInfo = 'student';
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<SimpleRoomInfo[]>(mockData);
  const [modalOpen, setModalOpen] = useState(true);
  const InviteRoomId = 0;

  useEffect(() => {
    if (!modalOpen) navigate('/user/roomlist');
  }, [modalOpen]);

  return (
    <div className="flex flex-col">
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <InviteModal setModalOpen={setModalOpen} id={InviteRoomId} />
        </Modal>
      )}
      <div>
        {rooms.map((room) => (
          <RoomInfo roleInfo={roleInfo} room={room} handleDelete={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default Invite;

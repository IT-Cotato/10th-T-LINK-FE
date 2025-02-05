import { Outlet, useNavigate } from 'react-router-dom';
import RoomInfo from '../../components/RoomInfo';
import { useEffect, useState } from 'react';
import { getRoomList, deleteRoom } from '../../api/roomList.api';
import { SimpleRoomInfo } from '../../models/room.model';

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

const RoomList = () => {
  // const roleInfo = localStorage.getItem('roleInfo');
  const roleInfo = 'teacher';
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<SimpleRoomInfo[]>(mockData);

  const fetchRooms = async () => {
    //const rooms = await getRoomList();
    setRooms(rooms);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (roomId: number) => {
    try {
      const status = await deleteRoom(roomId);
      if (status === 200) await fetchRooms();
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        {rooms.map((room) => (
          <RoomInfo key={room.roomId} roleInfo={roleInfo} room={room} handleDelete={handleDelete} />
        ))}
      </div>
      <div className="flex justify-end py-8">
        {roleInfo === 'teacher' && (
          <button onClick={() => navigate('/user/createroom')} className="text-white px-4 bg-black">
            + 과외방 개설
          </button>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default RoomList;

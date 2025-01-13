import { useNavigate } from 'react-router-dom';
import RoomInfo from '../components/RoomInfo';
import { useEffect, useState } from 'react';
import { getRoomList, deleteRoom } from '../api/roomList.api';
import { SimpleRoomInfo } from '../models/room.model';

const RoomList = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<SimpleRoomInfo[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomList = await getRoomList();
      setRooms(roomList);
    };
    fetchRooms();
  }, []);

  const handleDelete = async (roomId: number) => {
    try {
      await deleteRoom(roomId);
      setRooms((prevRooms) => prevRooms.filter((room) => room.roomId !== roomId)); // Update state
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        {rooms.map((room) => (
          <RoomInfo room={room} handleDelete={handleDelete} />
        ))}
      </div>
      <div className="flex justify-end py-8">
        <button onClick={() => navigate('createroom')} className="text-white px-4 bg-black">
          + 과외방 개설
        </button>
      </div>
    </div>
  );
};

export default RoomList;

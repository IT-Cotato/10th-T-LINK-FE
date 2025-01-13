import RoomEditor from '../components/RoomEditor';
import { useState } from 'react';
import { RoomInfo, Room } from '../models/room.model';
import { useNavigate } from 'react-router-dom';
import { postRoomInfo } from '../api/roomList.api';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState<Room | undefined>(undefined);

  const handleCreate = async (roomInfo: RoomInfo) => {
    const roomId = await postRoomInfo(roomInfo);
    navigate('/user/roomlist');
  };

  return (
    <div>
      <RoomEditor currentRoom={currentRoom} onSubmit={handleCreate} />
    </div>
  );
};
export default CreateRoom;

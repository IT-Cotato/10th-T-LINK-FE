import RoomEditor from '../../components/Room/RoomEditor';
import { useState } from 'react';
import { RoomInfo, Room } from '../../models/room.model';
import { useNavigate } from 'react-router-dom';
import { postRoomInfo } from '../../api/roomList.api';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState<Room | undefined>(undefined);

  const handleCreate = async (roomInfo: RoomInfo) => {
    const res = await postRoomInfo(roomInfo);
    const roomId = res.data;
    navigate('/user/sharecode', { state: { roomId: roomId } });
  };

  return <RoomEditor currentRoom={currentRoom} onSubmit={handleCreate} />;
};
export default CreateRoom;

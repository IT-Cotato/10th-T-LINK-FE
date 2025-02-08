import RoomEditor from '../../components/RoomEditor';
import { useState } from 'react';
import { RoomInfo, Room } from '../../models/room.model';
import { useNavigate } from 'react-router-dom';
import { postRoomInfo } from '../../api/roomList.api';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState<Room | undefined>(undefined);
  const roomId = 3;

  const handleCreate = async (roomInfo: RoomInfo) => {
    try {
      const res = await postRoomInfo(roomInfo);
      console.log(res);
      navigate('/user/sharecode', { state: { roomId: roomId } });
    } catch (e) {
      console.log(e);
      navigate('/user/sharecode', { state: { roomId: roomId } });
    }
  };

  return (
    <div>
      <RoomEditor currentRoom={currentRoom} onSubmit={handleCreate} />
    </div>
  );
};
export default CreateRoom;

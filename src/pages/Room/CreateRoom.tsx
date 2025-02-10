import RoomEditor from '../../components/RoomEditor';
import { useState } from 'react';
import { RoomInfo, RoomForEdit } from '../../models/room.model';
import { useNavigate } from 'react-router-dom';
import { postRoomInfo } from '../../api/roomList.api';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState<RoomForEdit | undefined>(undefined);

  const handleCreate = async (roomInfo: RoomInfo) => {
    try {
      const res = await postRoomInfo(roomInfo);
      const roomId = res.data.data;
      navigate('/user/sharecode', { state: { roomId: roomId } });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <RoomEditor currentRoom={currentRoom} onSubmit={handleCreate} />
    </div>
  );
};
export default CreateRoom;

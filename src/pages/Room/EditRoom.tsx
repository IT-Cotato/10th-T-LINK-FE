import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RoomEditor from '../../components/RoomEditor';
import { Room, RoomInfo } from '../../models/room.model';
import { getCurrentRoomInfo, patchRoomInfo } from '../../api/roomList.api';

const EditRoom = () => {
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState<Room | undefined>(undefined);
  const params = useParams<{ roomId: string }>();
  const paramsId = Number(params.roomId);

  useEffect(() => {
    const fetchCurrentRoom = async () => {
      const currentRoom = await getCurrentRoomInfo(paramsId);
      setCurrentRoom(currentRoom);
    };
    fetchCurrentRoom();
  }, []);

  const handleUpdate = async (roomInfo: RoomInfo) => {
    const status = await patchRoomInfo(roomInfo, paramsId);
    navigate('/user/roomlist');
  };

  return <RoomEditor currentRoom={currentRoom} onSubmit={handleUpdate} />;
};

export default EditRoom;

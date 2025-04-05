import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RoomEditor from '../../components/Room/RoomEditor';
import { Room } from '../../models/room.model';
import { getCurrentRoomInfo, patchRoomInfo } from '../../api/roomList.api';

const EditRoom = () => {
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState<Room>();

  const params = useParams<{ roomId: string }>();
  const paramsId = Number(params.roomId);

  useEffect(() => {
    getCurrentRoomInfo(paramsId).then((res) => {
      setCurrentRoom(res);
    });
  }, []);

  const handleUpdate = (updatedRoom: Room) => {
    patchRoomInfo(paramsId, updatedRoom).then(() => {
      navigate('/user/roomlist');
    });
  };

  return <RoomEditor currentRoom={currentRoom} onSubmit={handleUpdate} />;
};

export default EditRoom;

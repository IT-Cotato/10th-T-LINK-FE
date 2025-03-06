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
    const fetchCurrentRoom = async () => {
      const res = await getCurrentRoomInfo(paramsId);
      setCurrentRoom(res.data.data);
    };
    fetchCurrentRoom();
  }, []);

  const handleUpdate = async (updatedRoom: Room) => {
    try {
      const res = await patchRoomInfo(paramsId, updatedRoom);
      navigate('/user/roomlist');
    } catch (e) {
      console.log(e);
    }
  };

  return <RoomEditor currentRoom={currentRoom} onSubmit={handleUpdate} />;
};

export default EditRoom;

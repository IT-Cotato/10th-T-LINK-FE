import { useNavigate, useParams } from 'react-router-dom';
import { Room, useRoomContext, SimpleLessonDay, SimplePermission } from '../context/RoomContext';
import { useEffect, useState } from 'react';
import RoomEditor from '../components/RoomEditor';

const EditRoom = () => {
  const navigate = useNavigate();
  const params = useParams<{ roomId: string }>();
  const paramsId = Number(params.roomId);
  const { rooms, onUpdate } = useRoomContext();
  const [currentRoom, setCurrentRoom] = useState<Room | undefined>(undefined);

  useEffect(() => {
    const currentRoom = rooms.find((room) => room.id === paramsId);
    if (!currentRoom) {
      window.alert('존재하지 않는 과외방입니다.');
      navigate('roomlist');
    } else {
      setCurrentRoom(currentRoom);
    }
  }, [params.roomId, rooms, navigate]);
  console.log(currentRoom);

  const handleUpdate = (
    id: number,
    roomName: string,
    studentName: string,
    subject: string,
    lessonDays: SimpleLessonDay[],
    parentPermissions: SimplePermission,
    studentPermissions: SimplePermission,
  ) => {
    onUpdate(paramsId, roomName, studentName, subject, lessonDays, parentPermissions, studentPermissions);
    navigate('/user/roomlist');
  };

  return <RoomEditor currentRoom={currentRoom} onSubmit={handleUpdate} />;
};

export default EditRoom;

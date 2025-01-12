import RoomEditor from '../components/RoomEditor';
import { useState } from 'react';
import { Room, useRoomContext, SimpleLessonDay, SimplePermission } from '../context/RoomContext';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [currentRoom, setCurrentRoom] = useState<Room | undefined>(undefined);
  const { onCreate } = useRoomContext();

  const handleCreate = (
    id: number,
    roomName: string,
    studentName: string,
    subject: string,
    lessonDays: SimpleLessonDay[],
    parentPermissions: SimplePermission,
    studentPermissions: SimplePermission,
  ) => {
    onCreate(id, roomName, studentName, subject, lessonDays, parentPermissions, studentPermissions);
    navigate('/user/roomlist');
  };

  return (
    <div>
      <RoomEditor currentRoom={currentRoom} onSubmit={handleCreate} />
    </div>
  );
};
export default CreateRoom;

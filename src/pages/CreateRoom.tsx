import RoomEditor from '../components/RoomEditor';
import { useState } from 'react';
import { Room, useRoomContext } from '../context/RoomContext';
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
    days: string[],
    parentPermissions: string[],
    studentPermissions: string[],
  ) => {
    onCreate(id, roomName, studentName, subject, days, parentPermissions, studentPermissions);
    navigate('/user/roomlist');
  };

  return (
    <div>
      <RoomEditor currentRoom={currentRoom} onSubmit={handleCreate} />
    </div>
  );
};
export default CreateRoom;

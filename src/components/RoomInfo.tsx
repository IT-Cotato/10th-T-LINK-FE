import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { Room, useRoomContext } from '../context/RoomContext';

type RoomProps = {
  room: Room;
};

const RoomInfo = ({ room }: RoomProps) => {
  const { onDelete } = useRoomContext();

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <div className="flex items-center py-2.5 gap-4 px-4">
      <div className="flex items-center p-1.5">
        <img className="w-9 h-9" />
      </div>
      <div className="flex flex-1 flex-col text-gray-900 cursor-pointer">
        <h1 className="text-body1 font-bold leading-9">{room.roomName}</h1>
        <h3 className="text-body4 font-regular leading-6">학생이름</h3>
      </div>
      <div className="cursor-pointer">
        <CiEdit size={20} />
      </div>
      <div className="cursor-pointer" onClick={() => handleDelete(room.id)}>
        <MdDeleteOutline size={20} />
      </div>
    </div>
  );
};

export default RoomInfo;

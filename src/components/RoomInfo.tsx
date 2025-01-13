import { MdDeleteOutline } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { SimpleRoomInfo } from '../models/room.model';
import { useNavigate } from 'react-router-dom';

type RoomProps = {
  room: SimpleRoomInfo;
  handleDelete: (roomId: number) => void;
};

const RoomInfo = ({ room, handleDelete }: RoomProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center py-2.5 gap-4 px-4">
      <div className="flex items-center p-1.5">
        <img className="w-9 h-9" />
      </div>
      <div className="flex flex-1 flex-col text-gray-900 cursor-pointer" onClick={() => navigate(`${room.roomId}`)}>
        <h1 className="text-body1 font-bold leading-9">
          [{room.subject}] {room.roomName}
        </h1>
        <h3 className="text-body4 font-regular leading-6">{room.studentName}</h3>
      </div>
      <div className="cursor-pointer" onClick={() => navigate(`${room.roomId}/edit`)}>
        <CiEdit size={20} />
      </div>
      <div className="cursor-pointer" onClick={() => handleDelete(room.roomId)}>
        <MdDeleteOutline size={20} />
      </div>
    </div>
  );
};

export default RoomInfo;

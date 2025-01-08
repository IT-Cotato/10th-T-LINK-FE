import { useNavigate } from 'react-router-dom';
import RoomInfo from '../components/RoomInfo';
import { useRoomContext } from '../context/RoomContext';

const RoomList = () => {
  const navigate = useNavigate();
  const { rooms } = useRoomContext();

  return (
    <div className="flex flex-col">
      <div>
        {rooms.map((room) => (
          <RoomInfo key={room.id} room={room} />
        ))}
      </div>
      <div className="flex justify-end py-8">
        <button onClick={() => navigate('createroom')} className="text-white px-4">
          + 과외방 개설
        </button>
      </div>
    </div>
  );
};

export default RoomList;

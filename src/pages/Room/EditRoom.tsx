import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RoomEditor from '../../components/RoomEditor';
import { RoomInfo } from '../../models/room.model';
import { getCurrentRoomInfo, patchRoomInfo } from '../../api/roomList.api';

const EditRoom = () => {
  const navigate = useNavigate();
  // const [currentRoom, setCurrentRoom] = useState<RoomInfo>();
  const [currentRoom, setCurrentRoom] = useState<RoomInfo>({
    roomName: '방2',
    studentName: '학생 2',
    subject: '과목2',
    lessonDays: [
      {
        lessonDay: '금',
      },
      {
        lessonDay: '토',
      },
      {
        lessonDay: '일',
      },
    ],
    studentPermissions: {
      lecture_file: false,
      homework: false,
      gradeStatistic: false,
      counselingLog: false,
      deposit: false,
    },
    parentPermissions: {
      lecture_file: false,
      homework: false,
      gradeStatistic: false,
      counselingLog: false,
      deposit: false,
    },
  });
  const params = useParams<{ roomId: string }>();
  const paramsId = Number(params.roomId);

  useEffect(() => {
    const fetchCurrentRoom = async () => {
      const currentRoom = await getCurrentRoomInfo(paramsId);
      setCurrentRoom(currentRoom);
    };
    fetchCurrentRoom();
  }, []);

  const handleUpdate = async () => {
    const status = await patchRoomInfo(paramsId, currentRoom);
    if (status === 200) navigate('/user/roomlist');
  };

  return <RoomEditor currentRoom={currentRoom} onSubmit={handleUpdate} />;
};

export default EditRoom;

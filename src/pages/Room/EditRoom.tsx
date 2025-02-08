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
        lessonDay: '금요일',
      },
      {
        lessonDay: '토요일',
      },
      {
        lessonDay: '일요일',
      },
    ],
    studentPermission: {
      lecture_file: true,
      homework: true,
      gradeStatistic: true,
      counselingLog: false,
      deposit: false,
    },
    parentPermission: {
      lecture_file: false,
      homework: false,
      gradeStatistic: false,
      counselingLog: true,
      deposit: true,
    },
  });
  const params = useParams<{ roomId: string }>();
  const paramsId = Number(params.roomId);

  useEffect(() => {
    const fetchCurrentRoom = async () => {
      const res = await getCurrentRoomInfo(paramsId);
      console.log(res);
      //setCurrentRoom(res.data);
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

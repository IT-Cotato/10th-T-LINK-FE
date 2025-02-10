import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RoomEditor from '../../components/RoomEditor';
import { RoomForEdit } from '../../models/room.model';
import { getCurrentRoomInfo, patchRoomInfo } from '../../api/roomList.api';

const EditRoom = () => {
  const navigate = useNavigate();
  // const [currentRoom, setCurrentRoom] = useState<RoomInfo>();
  const [currentRoom, setCurrentRoom] = useState<RoomForEdit>({
    roomId: 1,
    roomName: '방2',
    studentName: '학생 2',
    subject: '과목2',
    lessonDays: [
      { lessonDayId: 9, lessonDay: '금' },
      { lessonDayId: 10, lessonDay: '토' },
      { lessonDayId: 11, lessonDay: '일' },
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
      console.log(res.data.data);
      // setCurrentRoom(res.data);
    };
    fetchCurrentRoom();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await patchRoomInfo(paramsId, currentRoom);
      console.log(res);
      navigate('/user/roomlist');
    } catch (e) {
      console.log(e);
    }
  };

  return <RoomEditor currentRoom={currentRoom} onSubmit={handleUpdate} />;
};

export default EditRoom;

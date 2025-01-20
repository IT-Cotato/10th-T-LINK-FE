import { useEffect, useState } from 'react';
import DetailButton from '../../components/DetailButton';
import { useParams } from 'react-router-dom';
import { RoomDetails } from '../../models/room.model';

const RoomDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomDetail, setRoomDetail] = useState<RoomDetails | null>(null);
  useEffect(() => {
    getRoomInfo();
  }, [roomId]);

  const getRoomInfo = async () => {
    try {
      // 확인용 mock data
      const mockResponse = {
        roomId: 1,
        roomName: '대현동 중3',
        studentName: '다람쥐',
        subject: '수학',
        lessonDays: [{ lessonDay: 'Monday' }, { lessonDay: 'Wednesday' }],
        nextDepositDate: '2025-01-31',
        permission: {
          lecture_file: true,
          homework: true,
          gradeStatistic: false,
          counselingLog: true,
          deposit: false,
        },
      };

      setRoomDetail(mockResponse);

      // const data = await getRoomDetail(roomId!);
      // setRoomDetail(response.data.data);
    } catch (error) {
      console.log('방 정보 가젿오기 실패', error);
    }
  };

  if (!roomDetail) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="px-4 flex-col flex gap-5">
      <h2>{roomDetail.roomName}</h2>
      <p>{`학생 이름: ${roomDetail.studentName}`}</p>
      <p>{`과목: ${roomDetail.subject}`}</p>
      <h3>수업 요일</h3>
      <ul>
        {roomDetail.lessonDays.map((day, index) => (
          <li key={index}>{day.lessonDay}</li>
        ))}
      </ul>
      <div className="grid grid-cols-2 gap-4">
        <DetailButton type="materials" isPermission={roomDetail.permission.lecture_file} />
        <DetailButton type="homework" isPermission={roomDetail.permission.homework} />
        <DetailButton type="stats" isPermission={roomDetail.permission.gradeStatistic} />
        <DetailButton type="diary" isPermission={roomDetail.permission.counselingLog} />
      </div>
      <DetailButton
        type="payment"
        nextDepositDate={roomDetail.nextDepositDate}
        isPermission={roomDetail.permission.deposit}
      />
      {/* role 보고 선생님이면 isPermission true */}
      <DetailButton type="invite" isPermission={true} />
    </div>
  );
};

export default RoomDetail;

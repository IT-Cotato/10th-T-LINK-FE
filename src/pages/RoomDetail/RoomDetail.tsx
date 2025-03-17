import { useEffect, useState } from 'react';
import DetailButton from '../../components/RoomDetail/DetailButton';
import { useNavigate, useParams } from 'react-router-dom';
import { RoomDetails } from '../../models/room.model';
import CalendarDeposit from '../../components/Calendar/CalendarDeposit';
import CalendarNolesson from '../../components/Calendar/CalendarNolesson';
import { getRoomDetail } from '../../api/roomList.api';
import Loading from '../Common/Loading';
import RoomDesc from '../../components/RoomDetail/RoomDesc';

const RoomDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomDetail, setRoomDetail] = useState<RoomDetails | null>(null);
  const nav = useNavigate();

  // 과외방 상세 정보 조회
  useEffect(() => {
    const getRoomInfo = async () => {
      const response = await getRoomDetail(roomId!);
      setRoomDetail(response?.data.data);
    };
    getRoomInfo();
  }, [roomId]);

  const userRole = localStorage.getItem('roleInfo');

  if (!roomDetail) {
    return <Loading text="데이터 로딩 중..." />;
  }

  return (
    <div className="flex-col flex">
      {/* 방 정보 */}
      <RoomDesc
        title={roomDetail.roomName}
        subject={roomDetail.subject}
        lessonDays={roomDetail.lessonDays}
        studentName={roomDetail.studentName}
      />
      {/* 목록 */}
      <div className={`grid grid-cols-2 gap-2 pb-6 px-4 border-b-2 border-gray-100`}>
        <DetailButton type="materials" isPermission={roomDetail.permission?.lectureFile} />
        <DetailButton type="homework" isPermission={roomDetail.permission?.homework} />
        <DetailButton type="stats" isPermission={roomDetail.permission?.gradeStatistic} />
        <DetailButton type="diary" isPermission={roomDetail.permission?.counselingLog} />
      </div>
      {/* 입금 & 링크 */}
      <div className="p-4 flex flex-col gap-2">
        <CalendarDeposit
          roomname={[roomDetail?.roomName]}
          nextDeopsit={roomDetail.depositAt}
          type={'roomDetail'}
          isPermission={roomDetail.permission?.deposit}
        />
        {userRole == 'TEACHER' && <CalendarNolesson isShareLink={true} roleInfo="TEACHER" />}
      </div>
    </div>
  );
};

export default RoomDetail;

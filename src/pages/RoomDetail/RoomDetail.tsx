import { useEffect, useState } from 'react';
import DetailButton from '../../components/RoomDetail/DetailButton';
import { useNavigate, useParams } from 'react-router-dom';
import { RoomDetails } from '../../models/room.model';
import Edit from '../../assets/images/RoomDetail/Edit.svg?react';
import CalendarDeposit from '../../components/Calendar/CalendarDeposit';
import CalendarNolesson from '../../components/Calendar/CalendarNolesson';
import { getRoomDetail } from '../../api/roomList.api';
import Loading from '../Common/Loading';

const RoomDetail = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [roomDetail, setRoomDetail] = useState<RoomDetails | null>(null);
  const nav = useNavigate();

  useEffect(() => {
    const getRoomInfo = async () => {
      try {
        const response = await getRoomDetail(roomId!);
        setRoomDetail(response.data.data);
      } catch (error) {
        console.log('방 정보 가져오기 실패', error);
      }
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
      <div className="flex flex-col p-4 gap-2">
        <div className="justify-between flex items-center">
          <h2 className="text-heading6 font-bold">{roomDetail?.roomName}</h2>
          {userRole == 'TEACHER' ? <Edit onClick={() => nav('edit')} /> : ''}
        </div>
        <div className="flex flex-col tracking-[-0.042px]">
          {/* 요일&과목명 */}
          <div className="flex flex-wrap text-body4 font-medium gap-[6px] items-center">
            <div>
              <span className="text-gray-500">#</span>
              <span className="text-primary_700">{roomDetail.subject}</span>
            </div>
            {roomDetail.lessonDays &&
              roomDetail.lessonDays
                .sort((a, b) => {
                  const dayOrder = ['월', '화', '수', '목', '금', '토', '일'];
                  return dayOrder.indexOf(a.lessonDay) - dayOrder.indexOf(b.lessonDay);
                })
                .map((day, index) => (
                  <li key={index} className="list-none">
                    <span className="text-gray-500">#</span>
                    <span className="text-primary_700">{day.lessonDay}요일</span>
                  </li>
                ))}
          </div>
          <div className="flex gap-[6px] text-body4 text-gray-500 items-center">
            <div className="flex gap-[2px]">
              {roomDetail.studentName ? (
                <>
                  <span className="text-gray-950">{roomDetail.studentName}</span>
                  <span>학생</span>
                </>
              ) : (
                <span>아직 학생이 참여하지 않았어요!</span>
              )}
            </div>
          </div>
        </div>
      </div>
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

        {userRole == 'TEACHER' && <CalendarNolesson isShareLink={true} />}
      </div>
    </div>
  );
};

export default RoomDetail;

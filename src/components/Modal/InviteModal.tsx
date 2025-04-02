import { useNavigate, useParams } from 'react-router-dom';
import { getRoomInfo, postShareCode } from '../../api/roomList.api';
import { useEffect, useState } from 'react';
import RoomInfoContent from '../Room/RoomInfoContent';
import { SimpleRoomInfo } from '../../models/room.model';

const InviteModal = () => {
  const navigation = useNavigate();
  const { roomId, shareCode } = useParams();
  const roleInfo = localStorage.getItem('roleInfo');
  const [roomData, setRoomData] = useState<SimpleRoomInfo>();

  useEffect(() => {
    const fetchRoomInfo = async () => {
      if (shareCode) {
        const res = await getRoomInfo(shareCode);
        setRoomData(res.data);
      }
    };
    if (roleInfo === 'STUDENT' || roleInfo === 'PARENT') {
      fetchRoomInfo();
    }
  }, [roleInfo, shareCode]);

  const handleAccept = async () => {
    if (!shareCode) return;

    postShareCode(shareCode).then(() => {
      navigation(`/user/${roomId}`);
    });
  };

  return roleInfo === 'STUDENT' || roleInfo === 'PARENT' ? (
    <div className="flex flex-col p-4 gap-6 w-[320px] bg-white rounded-[16px]">
      <div className="text-center font-semibold text-lg leading-8">
        {roomData?.opponent?.name ? (
          <>
            {roomData?.opponent?.name}님이 과외방으로
            <br />
            초대하셨습니다. 입장하시겠습니까?
          </>
        ) : (
          '과외방 정보를 불러오는데 실패하였습니다.'
        )}
      </div>
      <div className="bg-gray-50 p-4 rounded-lg pointer-events-none">
        {roomData && <RoomInfoContent room={roomData} roleInfo={roleInfo} />}
      </div>
      <div className="flex justify-center gap-4 w-full font-semibold text-base">
        <button
          className="w-full bg-primary_700 text-white rounded-[4px] py-3.5"
          onClick={handleAccept}
        >
          네
        </button>
        <button
          className="w-full border border-gray-500 rounded-[4px] py-3.5"
          onClick={() => navigation('/user/roomlist')}
        >
          아니요
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col p-4 gap-6 w-[320px] bg-white rounded-[16px]">
      <div className="text-center font-semibold text-lg leading-8">
        과외방에 입장할 수 없습니다.
      </div>
      <div className="flex justify-center gap-4 w-full font-semibold text-base">
        <button
          className="w-full border border-gray-500 rounded-[4px] py-3.5"
          onClick={() => navigation('/user/roomlist')}
        >
          창닫기
        </button>
      </div>
    </div>
  );
};

export default InviteModal;

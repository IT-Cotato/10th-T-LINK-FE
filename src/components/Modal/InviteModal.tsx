import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherName, postShareCode } from '../../api/roomList.api';
import { useEffect, useState } from 'react';
import RoomInfoContent from '../RoomInfoContent';

const mockData = {
  roomId: 15,
  roomName: '방이름입니당당',
  subject: '과학',
  lessonDays: [
    {
      lessonDay: '월',
    },
  ],
  opponent: {
    id: 2,
    name: '김선생',
    gender: '여성',
  },
};

const InviteModal = () => {
  const navigation = useNavigate();
  const { roomId, shareCode } = useParams();
  const roleInfo = localStorage.getItem('roleInfo');
  const [teacherName, setTeacherName] = useState('');

  useEffect(() => {
    const fetchTeacherName = async () => {
      try {
        if (shareCode) {
          const res = await getTeacherName(shareCode);
          setTeacherName(res.data.data.teacherName);
          console.log(teacherName);
        }
      } catch (e: any) {
        if (e.response.status === 401 || e.response.status === 404) {
          console.log('오류:', e.response.status);
        } else {
          console.log(e);
        }
      }
    };
    if (roleInfo === 'STUDENT' || roleInfo === 'PARENT') {
      fetchTeacherName();
    }
  }, [roleInfo, shareCode]);

  const handleAccept = async () => {
    if (!shareCode) return;

    try {
      const res = await postShareCode(shareCode);
      console.log(res);
      navigation(`/user/${roomId}`);
    } catch (e: any) {
      if (e.response?.status === 401 || e.response?.status === 404) {
        alert('입장할 수 없습니다.');
        navigation(`/user/roomlist`);
        console.log('오류:', e.response.data);
      } else {
        console.log(e);
      }
    }
  };

  return roleInfo === 'STUDENT' || roleInfo === 'PARENT' ? (
    <div className="flex flex-col p-4 gap-6 w-[320px] bg-white rounded-[16px]">
      <div className="text-center font-semibold text-lg leading-8">
        {teacherName ? (
          <>
            {teacherName}님이 과외방으로
            <br />
            초대하셨습니다. 입장하시겠습니까?
          </>
        ) : (
          '과외방 정보를 불러오는데 실패하였습니다.'
        )}
      </div>
      <div className="bg-gray-50 p-4 rounded-lg pointer-events-none">
        <RoomInfoContent room={mockData} roleInfo={roleInfo} />
      </div>
      <div className="flex justify-center gap-4 w-full font-semibold text-base">
        <button className="w-full bg-primary_700 text-white rounded-[4px] py-3.5" onClick={handleAccept}>
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
    <div className="flex flex-col py-5 w-[320px] bg-white rounded-[16px]">
      <div className="flex flex-1 flex-col justify-center items-center">입장할 수 없습니다.</div>
      <div className="flex justify-center gap-32 w-full">
        <button onClick={() => navigation('/user/roomlist')}>창 닫기</button>
      </div>
    </div>
  );
};

export default InviteModal;

import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherName, postShareCode } from '../../api/roomList.api';
import { useEffect, useState } from 'react';

const InviteModal = () => {
  const navigation = useNavigate();
  const { shareCode } = useParams();
  const roleInfo = localStorage.getItem('roleInfo');
  const [teacherName, setTeacherName] = useState('');

  useEffect(() => {
    const fetchTeacherName = async () => {
      try {
        if (shareCode) {
          const res = await getTeacherName(shareCode);
          //setTeacherName(res?.data?.teacherName);
          console.log(res);
        }
      } catch (e: any) {
        if (e.response?.status === 401 || e.response?.status === 404) {
          console.log('오류:', e.response.data);
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
      navigation('/user/roomlist');
    } catch (e: any) {
      if (e.response?.status === 401 || e.response?.status === 404) {
        console.log('오류:', e.response.data);
      } else {
        console.log(e);
      }
    }
  };

  return roleInfo === 'STUDENT' || roleInfo === 'PARENT' ? (
    <div className="flex flex-col py-5 w-1/3 min-w-[300px] h-1/5 bg-white rounded-[16px]">
      <div className="flex flex-1 flex-col justify-center items-center">
        {teacherName ? `${teacherName}님이 과외방으로 초대하셨습니다.` : '과외방 초대가 있습니다.'} <br />
        입장하시겠습니까?
      </div>
      <div className="flex justify-center gap-32 w-full">
        <button onClick={handleAccept}>네</button>
        <button onClick={() => navigation('/user/roomlist')}>아니요</button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col py-5 w-1/3 min-w-[300px] h-1/5 bg-white rounded-[16px]">
      <div className="flex flex-1 flex-col justify-center items-center">입장할 수 없습니다.</div>
      <div className="flex justify-center gap-32 w-full">
        <button onClick={() => navigation('/user/roomlist')}>창 닫기</button>
      </div>
    </div>
  );
};

export default InviteModal;

import { SimpleRoomInfo } from '../models/room.model';
import { useNavigate } from 'react-router-dom';
import student_boy from '../assets/images/student_boy.png';
import student_girl from '../assets/images/student_girl.png';
import teacher_man from '../assets/images/teacher_man.png';
import teacher_woman from '../assets/images/teacher_woman.png';
import no_student from '../assets/images/no_student.png';
import { useEffect, useState } from 'react';
import Modal from './Modal/Modal';
import ProfileModal from './Modal/ProfileModal';

type RoomProps = {
  room: SimpleRoomInfo;
  roleInfo: string;
};

const RoomInfoContent = ({ room, roleInfo }: RoomProps) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState('');
  const [profileImg, setProfileImg] = useState('');

  useEffect(() => {
    if (room.roomId % 3 == 0) setBgColor('#E1F5D6');
    else if (room.roomId % 3 == 1) setBgColor('#FFF6CC');
    else if (room.roomId % 3 == 2) setBgColor('#FFE5E5');

    if (room.opponent) {
      if (roleInfo === 'TEACHER' && room.opponent.gender === '남성') setProfileImg(student_boy);
      else if (roleInfo === 'TEACHER' && room.opponent.gender === '여성') setProfileImg(student_girl);
      else if ((roleInfo === 'STUDENT' || roleInfo === 'PARENT') && room.opponent.gender === '남성')
        setProfileImg(teacher_man);
      else if ((roleInfo === 'STUDENT' || roleInfo === 'PARENT') && room.opponent.gender === '여성')
        setProfileImg(teacher_woman);
    } else setProfileImg(no_student);
  });

  return (
    <div className="gap-4 flex flex-1 items-center">
      {profileOpen && room.opponent && (
        <Modal
          onClose={() => {
            setProfileOpen(false);
          }}
        >
          {room.opponent && (
            <ProfileModal setModalOpen={setProfileOpen} id={room.opponent.id} profileImg={profileImg} />
          )}
        </Modal>
      )}
      <div
        className="flex w-[60px] h-[60px] p-3 rounded-2xl cursor-pointer items-center justify-center"
        onClick={() => setProfileOpen(true)}
        style={{ backgroundColor: bgColor }}
      >
        <img className="h-9 max-w-9" src={profileImg} />
      </div>
      <div
        className="flex flex-col gap-1 text-gray-900 cursor-pointer"
        onClick={() => navigate(`/user/${room.roomId}`)}
      >
        <h1 className="text-base font-semibold leading-7">{room.roomName}</h1>
        <div className="flex flex-wrap gap-1.5 gap-y-0 text-body4 leading-6 font-medium">
          <div className="flex">
            <h3 className="text-gray-500">#</h3>
            <h3 className="text-primary_700 ">{room.subject}</h3>
          </div>
          {room.lessonDays
            .sort((a, b) => {
              const dayOrder = ['월', '화', '수', '목', '금', '토', '일'];
              return dayOrder.indexOf(a.lessonDay) - dayOrder.indexOf(b.lessonDay);
            })
            .map((lessonDay, idx) => (
              <div className="flex" key={idx}>
                <h3 className="text-gray-500">#</h3>
                <h3 className="text-primary_700">{lessonDay.lessonDay}요일</h3>
              </div>
            ))}
        </div>
        {room.opponent ? (
          <div className="flex gap-1 text-sm">
            <h3>{room.opponent.name}</h3>
            {roleInfo === 'TEACHER' ? (
              <h3 className="text-gray-500">학생</h3>
            ) : (
              <h3 className="text-gray-500">선생님</h3>
            )}
          </div>
        ) : (
          <h3 className="text-sm text-gray-500">아직 학생이 없습니다</h3>
        )}
      </div>
    </div>
  );
};

export default RoomInfoContent;
